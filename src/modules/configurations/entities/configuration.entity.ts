import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigurationDocument = Configuration & Document;

export enum ConfigurationKeys {
  LastBlockFetchTx = 'lastBlockFetchTx',
}

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Configuration {
  @Prop()
  key: ConfigurationKeys;

  @Prop()
  value: number;

  @Prop()
  chainId: number;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
