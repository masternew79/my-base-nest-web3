import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class DeleteAirdropDto {
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
