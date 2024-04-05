import { Module } from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { AirdropController } from './airdrop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AirdropSchema } from './schema/airdrop.schema';
import { DaoModule } from '../dao/dao.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Airdrop', schema: AirdropSchema }]),
    DaoModule,
    MemberModule,
  ],
  controllers: [AirdropController],
  providers: [AirdropService],
})
export class AirdropModule {}
