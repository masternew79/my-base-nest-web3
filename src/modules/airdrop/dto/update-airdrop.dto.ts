import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAirdropDto } from './create-airdrop.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateAirdropDto extends PartialType(CreateAirdropDto) {
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idDao: number;

  @ApiProperty({
    type: String,
    required: true,
    default: '6480349e5fefeb08091282b4',
  })
  @IsString()
  @IsNotEmpty()
  id: ObjectId;
}
