import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, type StrategyOptions } from 'passport-jwt';

// buat interface
interface JwtPayload {
  username: string;
  password: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'IF23D',
    };

    super(options);
  }

  // fungsi untuk validasi jwt
  validate(payload: JwtPayload) {
    return {
      username: payload.username,
      password: payload.password,
    };
  }
}
