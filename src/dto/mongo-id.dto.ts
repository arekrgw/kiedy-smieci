import { Matches } from 'class-validator';

export class MongoIdDto {
  @Matches(/^[a-f\d]{24}$/i, { message: 'Not a valid ID' })
  id: string;
}
