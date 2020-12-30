import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GarbageService } from './garbage.service';
import { GarbageDate } from './database/schemas/garbageDate.schema';
import { DatesUploadObject } from './dto/datesUpload.dto';
import { GarbageRegion } from './database/schemas/garbageRegion.schema';
import { MongoIdDto } from '../globalDto/mongoId.dto';
import { GarbageType } from './database/schemas/garbageType.schema';
import { GarbageCity } from './database/schemas/garbageCity.schema';

@Controller('')
export class GarbageController {
  constructor(private garbageService: GarbageService) {}

  @Get('regions')
  async findAllRegions(): Promise<GarbageRegion[]> {
    const data = await this.garbageService.getAllRegions();
    if (!data.length)
      throw new HttpException('No regions found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Get('regions/:id')
  @UsePipes(new ValidationPipe())
  async findRegion(@Param() { id }: MongoIdDto): Promise<GarbageRegion> {
    const data = await this.garbageService.getRegion(id);
    if (!data) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Get('dates/:id')
  @UsePipes(new ValidationPipe())
  async findDatesForRegion(
    @Param() { id }: MongoIdDto,
  ): Promise<GarbageDate[]> {
    const data = await this.garbageService.getDatesForRegion(id);
    if (!data.length)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Get('types')
  async findAllTypes(): Promise<GarbageType[]> {
    const data = await this.garbageService.getAllTypes();
    if (!data.length)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Get('cities')
  async findAllCities(): Promise<GarbageCity[]> {
    const data = await this.garbageService.getAllCities();
    if (!data.length)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Get('cities/:id')
  @UsePipes(new ValidationPipe())
  async findCity(@Param() { id }: MongoIdDto): Promise<GarbageCity> {
    const data = await this.garbageService.getCity(id);
    if (!data)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return data;
  }

  @Post('upload')
  @UsePipes(new ValidationPipe())
  async uploadDates(@Body() uploadData: DatesUploadObject): Promise<{message: string}>{
    const response = await this.garbageService.uploadNewRegionWithDates(uploadData);
    return response;
  }
}
