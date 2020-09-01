import { Controller, Get, Param } from '@nestjs/common';
import { GarbageService } from './garbage.service'
import { GarbageDate } from 'src/schemas/garbage-date.schema';

@Controller('')
export class GarbageController {
  constructor(private garbageService: GarbageService){}

  @Get('regions')
  allRegions(): any {
    console.log(process.env.DATABASE)
    return {
      name: "Rogow"
    }
  }

  @Get('dates')
  async allDates(): Promise<GarbageDate[]> {
    return await this.garbageService.findAllDates()
  }

  @Get('regions/:id')
  findRegion(@Param('id') id: string): any {
    return id
  }
}
