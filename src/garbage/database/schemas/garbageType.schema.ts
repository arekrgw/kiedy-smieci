import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GarbageType extends Document {
  @Prop({ unique: true })
  type: string;
}

export const GarbageTypeSchema = SchemaFactory.createForClass(GarbageType);
