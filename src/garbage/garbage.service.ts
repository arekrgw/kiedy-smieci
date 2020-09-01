import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GarbageDate } from '../schemas/garbage-date.schema';
import { Model } from 'mongoose';
import { GarbageType } from 'src/schemas/garbage-type.schema';

@Injectable()
export class GarbageService {
  constructor(
    @InjectModel(GarbageDate.name) private garbageDate: Model<GarbageDate>,
    @InjectModel(GarbageType.name) private garbageType: Model<GarbageType>,
  ) {}

  async findAllDates(): Promise<GarbageDate[]> {
    return await this.garbageDate
      .find()
      .populate('garbageType')
      .populate('garbageRegion', ['-postalCode', '-hours'])
      .exec();
  }
}
