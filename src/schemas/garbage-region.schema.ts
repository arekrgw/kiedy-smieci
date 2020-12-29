import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GarbageCity } from './garbage-city.schema';

@Schema()
export class GarbageRegion extends Document {
  @Prop()
  regionName: string;
  @Prop()
  postalCode: string;
  @Prop({ ref: GarbageCity.name })
  city: Types.ObjectId;
  @Prop()
  lastUsed: Date;
}

export const GarbageRegionSchema = SchemaFactory.createForClass(GarbageRegion);
