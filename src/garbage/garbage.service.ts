import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GarbageDate } from '../schemas/garbage-date.schema';
import { Model, Types } from 'mongoose';
import { GarbageType } from '../schemas/garbage-type.schema';
import { GarbageRegion } from '../schemas/garbage-region.schema';
import { GarbageCity } from '../schemas/garbage-city.schema';
import { DatesUpload } from '../dto/dates-upload.dto';
import * as moment from 'moment';
import { keyBy } from 'lodash';
import * as hash from 'object-hash';

@Injectable()
export class GarbageService {
  constructor(
    @InjectModel(GarbageDate.name) private garbageDate: Model<GarbageDate>,
    @InjectModel(GarbageType.name) private garbageType: Model<GarbageType>,
    @InjectModel(GarbageCity.name) private garbageCity: Model<GarbageCity>,
    @InjectModel(GarbageRegion.name)
    private garbageRegion: Model<GarbageRegion>,
  ) {}

  async getDatesForRegion(id: string): Promise<GarbageDate[]> {
    return await this.garbageDate
      .find({ garbageRegion: Types.ObjectId(id) })
      .populate('garbageType')
      .populate('garbageRegion', ['-postalCode', '-hours'])
      .populate({
        path: 'garbageRegion',
        populate: { path: 'city' },
      })
      .exec();
  }

  async getAllRegions(): Promise<GarbageRegion[]> {
    return await this.garbageRegion
      .find()
      .populate('city')
      .exec();
  }

  async getRegion(id: string): Promise<GarbageRegion> {
    return await this.garbageRegion
      .findOne({ _id: Types.ObjectId(id) })
      .populate('city')
      .exec();
  }

  async getAllTypes(): Promise<GarbageType[]> {
    return await this.garbageType.find().exec();
  }

  async getAllCities(): Promise<GarbageCity[]> {
    return await this.garbageCity.find().exec();
  }

  async getCity(id: string): Promise<GarbageCity> {
    return await this.garbageCity.findOne({ _id: Types.ObjectId(id) });
  }

  async uploadNewRegionWithDates(uploadData: DatesUpload): Promise<any> {
    //setting city
    let cityExist = await this.garbageCity.findOne({
      cityName: uploadData.city.cityName,
      province: uploadData.city.province,
    });
    if (!cityExist) {
      const { city } = uploadData;
      cityExist = await this.garbageCity.create({
        ...city,
      });
    }

    //setting region
    let regionExists = await this.garbageRegion.findOne({
      regionName: uploadData.region.regionName,
    });
    if (!regionExists) {
      const { region } = uploadData;
      regionExists = await this.garbageRegion.create({
        ...region,
        lastUsed: moment()
          .utc(true)
          .toISOString(true),
        city: cityExist._id,
      });
    }

    //setting types
    const uniqueTypes = new Set(uploadData.dates.map(({ type }) => type));
    const objectedTypes = Array.from(uniqueTypes).map(el => ({
      type: el,
    }));
    try {
      await this.garbageType.insertMany(objectedTypes, { ordered: false });
    } catch (e) {
      //ignore if duplicates
    }
    const types = await this.garbageType.find({
      type: { $in: Array.from(uniqueTypes) },
    });

    const keyedTypes = keyBy(types, el => {
      return el.type;
    });

    const finalDates = uploadData.dates.map(el => {
      const temp = {
        date: moment(el.date)
          .utc(true)
          .toISOString(true),
        garbageRegion: regionExists._id.toString(),
        garbageType: keyedTypes[el.type]._id.toString(),
      };
      return {
        ...temp,
        dateObjectHash: hash.sha1(temp),
      };
    });

    try {
      await this.garbageDate.insertMany(finalDates, { ordered: false });
    } catch (e) {
      if (e.code == 11000) {
        return {
          message:
            'Some dates was already in database, missing one were inserted',
        };
      }
      throw new HttpException('Error inserting dates', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'All dates have been inserted',
    };
  }
}
