import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GarbageType } from './garbageType.schema';
import { GarbageRegion } from './garbageRegion.schema';

@Schema({
  timestamps: true,
})
export class GarbageDate extends Document {
  @Prop({ ref: GarbageType.name })
  garbageType: Types.ObjectId;

  @Prop({ ref: GarbageRegion.name })
  garbageRegion: Types.ObjectId;

  @Prop()
  date: Date;

  @Prop({ unique: true, index: true })
  dateObjectHash: string;
}

export const GarbageDateSchema = SchemaFactory.createForClass(GarbageDate);
