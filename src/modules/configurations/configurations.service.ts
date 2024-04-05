import {
  Configuration,
  ConfigurationDocument,
  ConfigurationKeys,
} from './entities/configuration.entity';
import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface GetConfigurationsParams {
  chainId: number;
  key: ConfigurationKeys;
  defaultValue?: any;
}

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<ConfigurationDocument>,
  ) {}

  async findOne(key: ConfigurationKeys, chainId: number, defaultValue?: any) {
    let config = await this.configurationModel.findOne({
      key,
      chainId,
    });

    if (config) return config;

    const newConfig = new Configuration();
    newConfig.key = key;
    newConfig.chainId = chainId;
    newConfig.value = defaultValue != undefined ? defaultValue : null;
    const result = await this.configurationModel.create(newConfig);
    console.log('result:', result);
    return newConfig;
  }

  async getConfig({ key, chainId, defaultValue }: GetConfigurationsParams) {
    const config = await this.findOne(key, chainId, defaultValue);

    return config.value;
  }

  async updateConfig(params: {
    key: ConfigurationKeys;
    value: any;
    chainId: number;
  }) {
    const { key, chainId, value } = params;

    await this.configurationModel.findOneAndUpdate(
      { key, chainId },
      { value },
      { new: true },
    );
  }
}
