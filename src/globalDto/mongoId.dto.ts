import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({
    description: 'An ID of element',
    required: true,
  })
  @Matches(/^[a-f\d]{24}$/i, { message: 'Not a valid ID' })
  id: string;
}
