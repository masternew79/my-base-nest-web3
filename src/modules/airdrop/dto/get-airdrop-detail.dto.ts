import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetAirdropDetailDto {
  @ApiProperty({
    type: String,
    required: true,
    default: '0x3d9f658ce3cc3c4575bdb89e4f0970f08b9d13',
  })
  @IsString()
  @IsNotEmpty()
  memberAddress: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '64803ddeed18bb94a6898e64',
  })
  @IsString()
  @IsNotEmpty()
  airdropId: ObjectId;
}
