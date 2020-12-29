import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GarbageCity extends Document {
  @Prop()
  cityName: string;

  @Prop()
  province: string;
}

export const GarbageCitySchema = SchemaFactory.createForClass(GarbageCity);
