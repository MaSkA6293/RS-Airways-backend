import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
