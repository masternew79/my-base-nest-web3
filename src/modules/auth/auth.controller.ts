import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginGoogleDto } from './dto/login.dto';
import {
  ActivateAccountDto,
  CheckAvailablePhoneDto,
  SendActivateCodeDto,
  SignUpDto,
} from './dto/register.dto';
import { Role } from './enum/role.enum';
import { LocalAuthGuard } from './guard/local.guard';
import { Roles } from './roles/roles.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@ApiTags('Auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/admin/login')
  // @Roles(Role.All)
  async loginAdmin(@Body() signInDto: AdminLoginDto) {
    const { username, password } = signInDto;

    return await this.authService.loginAdmin({
      username,
      password,
    });
  }

  @Roles(Role.All)
  @Post('/register')
  async register(@Body() signUpDto: SignUpDto) {
    const { email, password, fullname, confirmPassword, refCode } = signUpDto;

    // return await this.authService.register({
    //   email,
    //   password,
    //   fullname,
    //   confirmPassword,
    //   refCode,
    // });
  }

  @Post('/login-email')
  @UseGuards(LocalAuthGuard)
  @Roles(Role.All)
  async loginEmail(@Body() signInDto: LoginDto) {
    const { email, password, fcmToken, apnToken } = signInDto;

    // return await this.authService.loginEmail({
    //   email,
    //   password,
    //   fcmToken,
    //   apnToken,
    // });
  }

  @Post('/login-google')
  @Roles(Role.All)
  async loginGoogle(@Body() signInDto: LoginGoogleDto) {
    const { googleTokenId, fcmToken, apnToken } = signInDto;

    // return await this.authService.loginGoogle({
    //   googleTokenId,
    //   fcmToken,
    //   apnToken,
    // });
  }

  @Post('/forgot/password')
  @UseGuards(LocalAuthGuard)
  @Roles(Role.All)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email, password, code } = forgotPasswordDto;

    // return await this.authService.forgotPassword({
    //   email,
    //   password,
    //   code,
    // });
  }
}
