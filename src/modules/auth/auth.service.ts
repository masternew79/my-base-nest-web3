import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseError } from 'src/utils/base-error';
import { checkHashPassword, hashPassword } from 'src/utils/hashing-password';
import { verifyFacebookToken, verifyGoogleToken } from 'src/utils/verify';

import { LoginDto, LoginGoogleDto } from './dto/login.dto';
import {
  ActivateAccountDto,
  CheckAvailablePhoneDto,
  SendActivateCodeDto,
  SignUpDto,
} from './dto/register.dto';
import { randomNumberString, randomText } from 'src/utils/helper';
import { Role } from './enum/role.enum';
import { AdminService } from '../admin/admin.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async authentication(phone: string, password: string): Promise<any> {
    try {
      const admin = await this.adminService.findOne({ phone });

      if (!admin) return false;

      const isValidPassword = await checkHashPassword(password, admin.password);

      if (!isValidPassword) return false;

      return admin;
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin({ username, password }: AdminLoginDto) {
    // Login with password
    const admin = await this.adminService.login({
      username,
      password,
    });

    // Generate jwt token
    const payloadJWT = {
      _id: admin._id,
      role: Role.Admin,
    };

    if (admin) {
      const accessToken = this.jwtService.sign(payloadJWT);
      const adminObject = await admin.toObject();

      return { ...adminObject, accessToken };
    } else {
      throw new HttpException('Authentication failed', 401);
    }
  }

  // async register({
  //   email,
  //   password,
  //   fullname,
  //   confirmPassword,
  //   refCode,
  // }: SignUpDto) {
  //   if (password != confirmPassword) {
  //     throw new BadRequestException('Confirm password not equal to password.');
  //   }

  //   const newUser = await this.userService.register({
  //     email,
  //     password,
  //     fullname,
  //     refCode,
  //   });
  //   if (newUser) return { data: newUser, message: 'Sign up successfully!' };
  // }

  // async loginEmail({ email, password, fcmToken, apnToken }: LoginDto) {
  //   // Login with password
  //   const user = await this.userService.loginEmail({
  //     email,
  //     password,
  //     fcmToken,
  //     apnToken,
  //   });

  //   // Generate jwt token
  //   const payloadJWT = {
  //     userId: user.id,
  //   };

  //   const accessToken = this.jwtService.sign(payloadJWT);
  //   return { accessToken };
  // }

  // async loginGoogle({ googleTokenId, fcmToken, apnToken }: LoginGoogleDto) {
  //   // Login with password
  //   const user = await this.userService.loginGoogle({
  //     googleTokenId,
  //     fcmToken,
  //     apnToken,
  //   });

  //   // Generate jwt token
  //   const payloadJWT = {
  //     userId: user.id,
  //   };

  //   const accessToken = this.jwtService.sign(payloadJWT);
  //   return { accessToken };
  // }

  // async forgotPassword({ email, password, code }: ForgotPasswordDto) {
  //   return await this.userService.forgotPassword({ email, password, code });
  // }

  // async signInWithGoogle(body: LoginGoogleDto) {
  //   // try {
  //   //   const { accessToken, deviceToken } = body;

  //   // const verifiedData = await verifyGoogleToken(accessToken);
  //   //   if (!verifiedData) {
  //   //     throw new BaseError({
  //   //       message: 'Unauthorized : Can not verify with google!',
  //   //     });
  //   //   }

  //   //   const userInfo = {
  //   //     email: verifiedData.email,
  //   //     clientName: verifiedData.displayName,
  //   //     avatar: verifiedData.photoURL,
  //   //     emailVerified: verifiedData.emailVerified,
  //   //     phone: verifiedData.phoneNumber,
  //   //   };

  //   //   let user = await this.clientService.findOne({ email: userInfo.email });
  //   //   const rawName = userInfo.clientName
  //   //     .toLowerCase()
  //   //     .trim()
  //   //     .normalize('NFD')
  //   //     .replace(/[\u0300-\u036f]/g, '')
  //   //     .replace(/đ/g, 'd')
  //   //     .replace(/Đ/g, 'D');

  //   //   if (!user) {
  //   //     user = await this.clientService.insertOne({
  //   //       phone: userInfo.phone,
  //   //       email: userInfo.email,
  //   //       name: userInfo.clientName,
  //   //     });
  //   //   }

  //   //   const payload = {
  //   //     id: user.id,
  //   //     phone: user.phone,
  //   //     name: user.name,
  //   //   };

  //   //   const token = this.jwtService.sign(payload);
  //   //   return {
  //   //     statusCode: 200,
  //   //     data: {
  //   //       client: user,
  //   //       accessToken: token,
  //   //     },
  //   //     message: 'Sign in successfully',
  //   //   };
  //   // } catch (error) {
  //   //   console.log(error);

  //   //   throw new HttpException(
  //   //     {
  //   //       statusCode: error.statusCode,
  //   //       message: error.message,
  //   //       data: null,
  //   //     },
  //   //     400,
  //   //   );
  //   // }
  // }

  // async signInWithFacebook(body: SignInWithFacebookDto) {
  //   // try {
  //   //   const { accessToken, deviceToken } = body;

  //   //   const verifiedData = await verifyFacebookToken(accessToken);
  //   //   if (!verifiedData) {
  //   //     throw new BaseError({
  //   //       message: 'Unauthorized : Can not verify with facebook!',
  //   //     });
  //   //   }

  //   //   const userInfo = {
  //   //     email: verifiedData.email,
  //   //     clientName: verifiedData.name,
  //   //     avatar: verifiedData.picture?.data?.url,
  //   //     phone: verifiedData.phoneNumber,
  //   //   };

  //   //   let user = await this.clientService.findOne({ email: userInfo.email });
  //   //   const rawName = userInfo.clientName
  //   //     .toLowerCase()
  //   //     .trim()
  //   //     .normalize('NFD')
  //   //     .replace(/[\u0300-\u036f]/g, '')
  //   //     .replace(/đ/g, 'd')
  //   //     .replace(/Đ/g, 'D');

  //   //   if (!user) {
  //   //     user = await this.clientService.insertOne({
  //   //       phone: userInfo.phone,
  //   //       email: userInfo.email,
  //   //       name: userInfo.clientName,
  //   //     });
  //   //   }

  //   //   const payload = {
  //   //     id: user.id,
  //   //     phone: user.phone,
  //   //     name: user.name,
  //   //   };

  //   //   const token = this.jwtService.sign(payload);
  //   //   return {
  //   //     statusCode: 200,
  //   //     data: {
  //   //       client: user,
  //   //       accessToken: token,
  //   //     },
  //   //     message: 'Sign in with Facebook successfully',
  //   //   };
  //   // } catch (error) {
  //   //   console.log(error);

  //   //   throw new HttpException(
  //   //     {
  //   //       statusCode: error.statusCode,
  //   //       message: error.message,
  //   //       data: null,
  //   //     },
  //   //     400,
  //   //   );
  //   // }
  // }
}
