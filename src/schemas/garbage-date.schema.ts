import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GarbageType } from './garbage-type.schema';
import { GarbageRegion } from './garbage-region.schema';

@Schema()
export class GarbageDate extends Document {
  @Prop({ ref: GarbageType.name })
  garbageType: Types.ObjectId;

  @Prop({ ref: GarbageRegion.name })
  garbageRegion: Types.ObjectId;

  @Prop()
  date: string;

  @Prop({ unique: true })
  dateObjectHash: string;
}

export const GarbageDateSchema = SchemaFactory.createForClass(GarbageDate);
