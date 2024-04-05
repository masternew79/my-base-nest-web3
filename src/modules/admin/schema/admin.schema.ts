import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTimestampsConfig } from 'mongoose';
import { Role } from 'src/modules/auth/enum/role.enum';

export type AdminDocument = Admin & Document & SchemaTimestampsConfig;

export enum AdminStatus {
  Active = 'ACTIVE',
  Disable = 'DISABLE',
}

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Admin {
  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ length: 10 })
  username: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: AdminStatus.Active })
  status: AdminStatus;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
