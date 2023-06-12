import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await new UserEntity(createUserDto).create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[] | []> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return undefined;

    return user;
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
