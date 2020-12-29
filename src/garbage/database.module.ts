import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  GarbageCity,
  GarbageCitySchema,
} from 'src/schemas/garbage-city.schema';
import {
  GarbageDate,
  GarbageDateSchema,
} from 'src/schemas/garbage-date.schema';
import {
  GarbageRegion,
  GarbageRegionSchema,
} from 'src/schemas/garbage-region.schema';
import {
  GarbageType,
  GarbageTypeSchema,
} from 'src/schemas/garbage-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GarbageDate.name,
        schema: GarbageDateSchema,
      },
      {
        name: GarbageType.name,
        schema: GarbageTypeSchema,
      },
      {
        name: GarbageRegion.name,
        schema: GarbageRegionSchema,
      },
      {
        name: GarbageCity.name,
        schema: GarbageCitySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class GarbageDatabaseModule {}
