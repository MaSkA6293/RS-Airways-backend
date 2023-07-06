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
import { UserModel } from 'src/user/models/user.model';

@ApiTags('Authorization API')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserModel })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `User with the email already exists`,
  })
  @Post('signUp')
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.authService.signup(userDto);

    if (user) return user;

    throw new HttpException(
      `User with email: ${userDto.email} already exists`,
      HttpStatus.CONFLICT,
    );
  }

  @ApiOperation({ summary: 'Return tokens' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 401, description: 'Username or password is invalid' })
  @Post('/signIn')
  @HttpCode(200)
  async login(@Body() loginUser: LoginUserDto): Promise<TokenResponse> {
    const token = await this.authService.signIn(loginUser);

    if (token) return token;

    throw new UnauthorizedException('Invalid username or password');
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 403, description: 'Token is invalid' })
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenDto): Promise<TokenResponse> {
    const tokens = await this.authService.refresh(refreshDto);

    if (tokens) return tokens;

    throw new ForbiddenException();
  }
}
