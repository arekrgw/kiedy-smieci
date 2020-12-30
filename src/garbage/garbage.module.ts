import { Module } from '@nestjs/common';
import { GarbageController } from './garbage.controller';
import { GarbageService } from './garbage.service';
import { GarbageDatabaseModule } from './database/garbage.database';
@Module({
  imports: [GarbageDatabaseModule],
  controllers: [GarbageController],
  providers: [GarbageService],
})
export class GarbageModule {}
