import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Configuration,
  ConfigurationSchema,
} from './entities/configuration.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Configuration.name, schema: ConfigurationSchema },
    ]),
  ],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
