import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class GarbageRegion extends Document {
  @Prop()
  regionName: string;
  @Prop()
  postalCode: string;
  @Prop()
  city: Types.ObjectId;
  @Prop()
  lastUsed: string;
}

export const GarbageRegionSchema = SchemaFactory.createForClass(GarbageRegion);
