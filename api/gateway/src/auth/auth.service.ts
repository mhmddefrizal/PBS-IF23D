import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(dto: AuthDto) {
    const payload = {
      username: dto.username,
      password: dto.password,
    };

    return {
      success: true,
      message: 'Access Token Berhasil Dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(payload),
        token_type: 'Bearer',
        expires_in: 60, // detik
      },
    };
  }
}
