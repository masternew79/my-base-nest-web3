import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAirdropDto } from './dto/create-airdrop.dto';
import { UpdateAirdropDto } from './dto/update-airdrop.dto';
import { AirdropDocument } from './schema/airdrop.schema';
import { BaseService } from 'src/common/service/base-service';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteAirdropDto } from './dto/delete-airdrop.dto';
import { DaoService } from '../dao/dao.service';
import { GetAirdropDetailDto } from './dto/get-airdrop-detail.dto';
import { GetAirdropsDto } from './dto/get-airdrops.dto';
import { MemberService } from '../member/member.service';

@Injectable()
export class AirdropService extends BaseService<AirdropDocument> {
  constructor(
    @InjectModel('Airdrop')
    private airdropModel: Model<AirdropDocument>,
    @Inject(DaoService)
    private daoService: DaoService,
    @Inject(MemberService)
    private memberService: MemberService,
  ) {
    super(airdropModel);
  }

  async create(createAirdropDto: CreateAirdropDto) {
    const { idDao } = createAirdropDto;

    try {
      const isDao = await this.daoService.isDao(idDao);
      if (!isDao) {
        throw new ForbiddenException('You do not have permission.');
      }

      return await this.airdropModel.create(createAirdropDto);
    } catch (error) {
      throw error;
    }
  }

  async update(updateAirdropDto: UpdateAirdropDto) {
    const { id, idDao } = updateAirdropDto;

    try {
      const isDao = await this.daoService.isDao(idDao);
      if (!isDao) {
        throw new ForbiddenException('You do not have permission.');
      }

      const existingAirdrop = await this.airdropModel.findById(id);
      if (!existingAirdrop) {
        throw new BadRequestException('Airdrop was not found!');
      }

      return await this.airdropModel.findByIdAndUpdate(id, updateAirdropDto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(deleteAirdropDto: DeleteAirdropDto) {
    const { id, idDao } = deleteAirdropDto;

    try {
      const isDao = await this.daoService.isDao(idDao);
      if (!isDao) {
        throw new ForbiddenException('You do not have permission.');
      }

      const existingAirdrop = await this.airdropModel.findById(id);
      if (!existingAirdrop) {
        throw new BadRequestException('Airdrop was not found!');
      }

      return await this.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getAirdrops(getAirdropsDto: GetAirdropsDto) {
    const { memberAddress } = getAirdropsDto;

    try {
      const memberInfo = await this.memberService.findOne({ memberAddress });
      const airdropsBelongsToOwner = await this.airdropModel.find({
        idDao: memberInfo.idDao,
        isDeleted: false,
      });

      return airdropsBelongsToOwner;
    } catch (error) {
      throw error;
    }
  }

  async getAirdropDetail(getAirdropDetailDto: GetAirdropDetailDto) {
    const { memberAddress, airdropId } = getAirdropDetailDto;
    try {
      const memberInfo = await this.memberService.findOne({ memberAddress });

      return await this.airdropModel.findOne({
        _id: airdropId,
        idDao: memberInfo.idDao,
        isDeleted: false,
      });
    } catch (error) {
      throw error;
    }
  }
}
