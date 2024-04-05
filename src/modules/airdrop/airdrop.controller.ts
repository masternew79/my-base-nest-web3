import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AirdropService } from './airdrop.service';
import { CreateAirdropDto } from './dto/create-airdrop.dto';
import { UpdateAirdropDto } from './dto/update-airdrop.dto';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteAirdropDto } from './dto/delete-airdrop.dto';
import { GetAirdropDetailDto } from './dto/get-airdrop-detail.dto';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { GetAirdropsDto } from './dto/get-airdrops.dto';

@ApiTags('Airdrop')
@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Post('add')
  // @ApiBearerAuth()
  // @Roles(Role.Dao)
  create(@Body() createAirdropDto: CreateAirdropDto) {
    return this.airdropService.create(createAirdropDto);
  }

  @Post('update')
  // @ApiBearerAuth()
  // @Roles(Role.Dao)
  update(@Body() updateAirdropDto: UpdateAirdropDto) {
    return this.airdropService.update(updateAirdropDto);
  }

  @Post('delete')
  // @ApiBearerAuth()
  // @Roles(Role.Dao)
  delete(@Body() deleteAirdropDto: DeleteAirdropDto) {
    return this.airdropService.delete(deleteAirdropDto);
  }

  @Get('all')
  getAirdrops(@Query() getAirdropsDto: GetAirdropsDto) {
    return this.airdropService.getAirdrops(getAirdropsDto);
  }

  @Get('detail')
  getAirdropDetail(@Query() getAirdropDetailDto: GetAirdropDetailDto) {
    return this.airdropService.getAirdropDetail(getAirdropDetailDto);
  }
}
