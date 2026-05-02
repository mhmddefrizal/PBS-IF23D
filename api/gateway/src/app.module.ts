import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [KategoriModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
