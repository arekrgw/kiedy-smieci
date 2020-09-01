import { Module } from '@nestjs/common';
import { GarbageController } from './garbage.controller';
import { GarbageService } from './garbage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GarbageDate, GarbageDateSchema } from 'src/schemas/garbage-date.schema';
import { GarbageType, GarbageTypeSchema } from 'src/schemas/garbage-type.schema';
import { GarbageRegion, GarbageRegionSchema } from 'src/schemas/garbage-region.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GarbageDate.name,
        schema: GarbageDateSchema
      },
      {
        name: GarbageType.name,
        schema: GarbageTypeSchema
      },
      {
        name: GarbageRegion.name,
        schema: GarbageRegionSchema
      },
    ])
  ],
  controllers: [GarbageController],
  providers: [GarbageService]
})
export class GarbageModule {}
