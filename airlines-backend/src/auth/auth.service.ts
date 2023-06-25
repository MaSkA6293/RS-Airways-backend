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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDto) {
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

  private async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);

    if (!user) return undefined;

    const isPasswordEquals = await compare(password, user.password);

    if (!isPasswordEquals) return undefined;

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  private async generateTokens(id: string) {
    const payload = { userId: id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: '30d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh(refreshDto: RefreshTokenDto) {
    const { refreshToken } = refreshDto;

    try {
      const verifyResult = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      const { userId } = verifyResult;

      const user = await this.userService.findOne(userId);
      if (!user || user.id !== userId) return undefined;

      return this.generateTokens(user.id);
    } catch (error) {
      return undefined;
    }
  }
}
