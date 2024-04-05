import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/modules/auth/enum/role.enum';
import { Status } from '../enum/status.enum';

export type AirdropDocument = Airdrop & Document;

export enum AirdropStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'disabled',
}

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Airdrop {
  @Prop({ required: true })
  idDao: number;
  @Prop({ required: true, default: '' })
  tokenSymbol: string;
  @Prop({ required: true, default: '' })
  name: string;
  @Prop({ default: '' })
  imageUrl: string;
  @Prop({ required: true, default: Status.Ongoing })
  status: string;
  @Prop({ required: true, default: 0 })
  total: number;
  @Prop({ default: false })
  isDeleted: boolean;
}

export const AirdropSchema = SchemaFactory.createForClass(Airdrop);
