import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  // import passport dan jwt (untuk buat token)
  imports: [
    // cek kesesuaian dengan jwt.guard
    PassportModule.register({}),
    // cek kesesuian dengan jwt.strategy
    JwtModule.register({
      secret: 'Access-IF23D',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, JwtAccessStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
