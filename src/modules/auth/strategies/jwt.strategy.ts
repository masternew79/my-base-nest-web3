import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthPayload } from '../interface/auth-payload.interface';
import { JWT_CONSTANTS } from '../constants';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.Secret,
    });
  }

  async validate(payload: AuthPayload) {
    return { name: payload.name, email: payload.phone, id: payload.id };
  }
}
