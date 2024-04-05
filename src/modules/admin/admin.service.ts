import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/service/base-service';
import { BaseError } from 'src/utils/base-error';
import { checkHashPassword, hashPassword } from 'src/utils/hashing-password';
import { Admin, AdminDocument, AdminStatus } from './schema/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginDto } from '../auth/dto/admin-login.dto';
import { CUSTOM_HTTP_EXCEPTIONS } from 'src/constants/custom-http-exceptions';
import { DaoService } from '../dao/dao.service';
import { ProfitService } from '../profit/profit.service';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class AdminService extends BaseService<AdminDocument> {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @Inject(DaoService)
    private daoService: DaoService,
    @Inject(ProfitService)
    private profitService: ProfitService,
  ) {
    super(adminModel);
  }

  @Timeout(0)
  async init() {
    this.create({
      username: 'admin',
      password: '123456',
      name: 'admin',
      secret: process.env.SECRET_ADMIN,
    });
  }

  async create({ username, password, name, secret }: CreateAdminDto) {
    if (!secret || secret != process.env.SECRET_ADMIN) {
      throw new BadRequestException('Invalid secret key to create admin');
    }

    const countExistingAdmin = await this.adminModel.countDocuments({
      username,
    });
    if (countExistingAdmin > 0)
      throw new BadRequestException('Username already exist!');

    const hashedPassword = await hashPassword(password);

    const newAdmin = await this.insertOne({
      username,
      name: name,
      password: hashedPassword,
    });

    return newAdmin;
  }

  async login({ username, password }: AdminLoginDto) {
    const admin = await this.adminModel.findOne({ username });

    if (!admin) {
      throw new BadRequestException('Username not exist!');
    }

    // Compare password with hashed password
    const isRightPassword = await checkHashPassword(password, admin.password);
    if (!isRightPassword) throw new BadRequestException('Incorrect password.');

    return admin;
  }

  async findActiveAdmin(id: string) {
    return await this.adminModel.findOne({
      _id: id,
      status: AdminStatus.Active,
    });
  }

  async getProfile() {
    return await this.adminModel.findOne({ username: 'admin' });
  }

  async getDashboard() {
    const numberOfDays = 30;
    try {
      const totalDAOs = await this.daoService.getNumberOfDAOs();
      const countDaoByLevel = await this.daoService.countDaoByLevel();
      const totalDAOsInLevel = [];
      Object.entries(countDaoByLevel).forEach(([key, value]) => {
        totalDAOsInLevel.push({ label: key, total: value });
      });
      const totalProfits = await this.profitService.getTotalProfits();
      const newDAOsIn30ClosedDays = await this.daoService.getNewDAOInRangeDay(
        numberOfDays,
      );

      return {
        totalDAOs,
        totalDAOsInLevel,
        totalProfits,
        newDAOsIn30ClosedDays,
      };
    } catch (error) {
      throw error;
    }
  }
}
