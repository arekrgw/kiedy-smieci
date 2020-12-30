import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GarbageCity } from './garbageCity.schema';

@Schema()
export class GarbageRegion extends Document {
  @Prop()
  regionName: string;
  @Prop()
  postalCode: string;
  @Prop({ ref: GarbageCity.name })
  city: Types.ObjectId;
}

export const GarbageRegionSchema = SchemaFactory.createForClass(GarbageRegion);
