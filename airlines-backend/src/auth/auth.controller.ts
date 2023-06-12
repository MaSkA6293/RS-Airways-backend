import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { TokenResponse } from './models/tokenResponse.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Authorization API')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post('signUp')
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);

    if (!user)
      throw new HttpException(
        `User with email: ${userDto.email} already exists`,
        HttpStatus.CONFLICT,
      );
    return user;
  }

  @ApiOperation({ summary: 'Return token' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @Post('/signIn')
  @HttpCode(200)
  async login(@Body() loginUser: LoginUserDto) {
    const token = await this.authService.signIn(loginUser);
    if (!token) throw new UnauthorizedException('Invalid username or password');

    return token;
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    const tokens = await this.authService.refresh(refreshDto);

    if (!tokens) throw new ForbiddenException();

    return tokens;
  }
}
