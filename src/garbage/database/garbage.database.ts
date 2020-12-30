import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  GarbageCity,
  GarbageCitySchema,
} from 'src/garbage/database/schemas/garbageCity.schema';
import {
  GarbageDate,
  GarbageDateSchema,
} from 'src/garbage/database/schemas/garbageDate.schema';
import {
  GarbageRegion,
  GarbageRegionSchema,
} from 'src/garbage/database/schemas/garbageRegion.schema';
import {
  GarbageType,
  GarbageTypeSchema,
} from 'src/garbage/database/schemas/garbageType.schema';

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
