import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';

const { ExtractJwt, Strategy } = passportJwt;

interface JwtPayload {
  username: string;
  password: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'IF23D',
    });
  }

  validate(payload: JwtPayload) {
    return {
      username: payload.username,
      password: payload.password,
    };
  }
}
