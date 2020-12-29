import { Matches, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class DateObject {
  @Matches(/^20[2-9]\d-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
  date: string;
  @IsString()
  type: string;
}

export class GarbageRegionDto {
  @IsString()
  regionName: string
  @IsString()
  postalCode: string
}

export class GarbageCityDto {
  @IsString()
  cityName: string;
  @IsString()
  province: string;
}

export class DatesUpload {
  @ValidateNested({ each: true })
  @Type(() => GarbageCityDto)
  city: GarbageCityDto;

  @ValidateNested({ each: true })
  @Type(() => GarbageRegionDto)
  region: GarbageRegionDto;

  @ValidateNested({ each: true })
  @Type(() => DateObject)
  dates: DateObject[];
}