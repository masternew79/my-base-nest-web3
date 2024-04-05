import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Request
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { hashPassword } from 'src/utils/hashing-password';
import { Role } from '../auth/enum/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

const { DType, Response, Operation, API } = require('swagger-generator-json')
// By default will be get method
const documentsSearchUser = new API({
  path: '/public/users/search',
  operation: [
    new Operation({
      method: DType.get,
      parameters: [
        {
          name: 'username',
          type: DType.string,
          place: DType.query,
          description: "Username must be required"
        }
      ],
      responses: [
        new Response({
          schema: [{
            id: DType.number,
            name: DType.string,
            isAdmin: DType.boolean
          }]
        }),
        new Response({
          code: 302,
          schema: [{
            id: DType.number,
            name: DType.string,
            isAdmin: DType.boolean
          }]
        })
      ],
      tags: 'public/user'
    })
  ]
})

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create')
  async createAdmin(@Body() body: CreateAdminDto) {
    const newAdmin = await this.adminService.create(body);
    return newAdmin;
  }
  @Get('profile')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  getProfile(
    @Request() req: any
  ) {
    return req.admin;
  }

  @Get('dashboard')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  getDashboard() {
    return this.adminService.getDashboard();
  }
}
