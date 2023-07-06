import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponse } from './models/tokenResponse.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDto): Promise<UserEntity | undefined> {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (user) return undefined;

    return this.userService.create(userDto);
  }

  async signIn(login: LoginUserDto) {
    const { email, password } = login;
    const user = await this.validateUser(email, password);

    if (!user) return undefined;

    return this.generateTokens(user.id);
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.getUserByEmail(email);

    if (!user) return undefined;

    const isPasswordEquals = await compare(password, user.password);

    if (!isPasswordEquals) return undefined;

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  private async generateTokens(id: string): Promise<TokenResponse> {
    const payload = { userId: id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh({
    refreshToken,
  }: RefreshTokenDto): Promise<TokenResponse | undefined> {
    try {
      const { userId } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      const user = await this.userService.findOne(userId);

      if (!user || user.id !== userId) return undefined;

      return this.generateTokens(user.id);
    } catch {
      return undefined;
    }
  }
}
