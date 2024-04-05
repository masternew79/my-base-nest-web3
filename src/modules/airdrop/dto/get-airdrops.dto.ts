import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetAirdropsDto {
  @ApiProperty({
    type: String,
    required: true,
    default: '0x3d9f658ce3cc3c4575bdb89e4f0970f08b9d1354',
  })
  @IsString()
  @IsNotEmpty()
  memberAddress: string;
}
