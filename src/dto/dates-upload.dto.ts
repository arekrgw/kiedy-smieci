import { Matches, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DateObject {
  @ApiProperty({
    description: 'Date eg. 2020-12-12',
    default: '2020-12-12',
  })
  @Matches(/^20[2-9]\d-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
  date: string;

  @ApiProperty({
    description: 'Type name of garbage',
  })
  @IsString()
  type: string;
}

export class GarbageRegionDto {
  @ApiProperty({
    description: 'Region Name',
  })
  @IsString()
  regionName: string;

  @ApiProperty({
    description: 'Region Postal Code',
  })
  @IsString()
  postalCode: string;
}

export class GarbageCityDto {
  @ApiProperty({
    description: 'City Name',
  })
  @IsString()
  cityName: string;

  @ApiProperty({
    description: 'City Province',
  })
  @IsString()
  province: string;
}

export class DatesUpload {
  @ApiProperty({
    description: 'City object',
  })
  @ValidateNested({ each: true })
  @Type(() => GarbageCityDto)
  city: GarbageCityDto;

  @ApiProperty({
    description: 'Region object',
  })
  @ValidateNested({ each: true })
  @Type(() => GarbageRegionDto)
  region: GarbageRegionDto;

  @ApiProperty({
    description: 'Dates array',
    type: [DateObject],
  })
  @ValidateNested({ each: true })
  @Type(() => DateObject)
  dates: DateObject[];
}
