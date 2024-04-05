import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/modules/admin/admin.service';
import { Role } from '../enum/role.enum';
import { JWT_CONSTANTS } from '../constants';
import { DaoService } from 'src/modules/dao/dao.service';
// import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private adminService: AdminService, // private userService: UserService,
    private daoService: DaoService,
  ) {}

  getPayload(request: any) {
    const bearerToken = request?.headers?.authorization;
    if (!bearerToken) {
      console.log('Missing Bearer + AccessToken');
      return null;
    }

    const token = bearerToken.slice(7);
    if (!token || !token.length) {
      console.log('Missing AccessToken');
      return null;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: JWT_CONSTANTS.Secret,
      });
      if (!payload) {
        console.log('Can not verify accessToken');
        return null;
      }
      return payload;
    } catch (error) {
      return null;
    }

    // const role_owner = bearerToken.slice(7).split('/');
    // const payload = {
    //   role: role_owner[0],
    //   idDao: role_owner[1],
    // };
  }

  async verifyUser(payload: any) {
    const userId = payload.userId;
    if (!userId) {
      console.log('Payload do not have userId');
      return null;
    }

    // const activeUser = await this.userService.findActiveUser(payload.userId);
    // if (!activeUser) {
    //   console.log('Can not find Active User: ', payload.userId);
    //   return null;
    // }

    // return activeUser;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get role restrict of function Controller
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // No need check role
    if (!roles || !roles.length) return true;

    const role = roles[0];
    if (role === Role.All) return true;

    const request = context.switchToHttp().getRequest();

    const payload = this.getPayload(request);
    // console.log('payload:', payload);
    if (!payload) return false;

    switch (role) {
      case Role.Admin:
        const adminProfile = await this.adminService.findOne({
          _id: payload._id,
        });
        if (!adminProfile) return false;

        request.admin = adminProfile;
        return true;

      // case Role.Dao:
      //   // const activeUser = await this.verifyUser(payload);
      //   // if (!activeUser) return false;
      //   // request.user = activeUser;
      //   if (await this.daoService.isDao(idDao)) return true;
      //   return false;

      default:
        return false;
    }
  }
}
