import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const { BCRYPT_SALT } = process.env;

@Entity('user')
export class UserEntity {
  @ApiProperty({
    example: '26bb1722-38dd-42eb-b6fa-6cae47c5b585',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  @Column({
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'Password',
  })
  @Column({
    nullable: false,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @Column({
    nullable: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @Column({
    nullable: false,
  })
  lastName: string;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Date of birthday',
  })
  @Column({
    nullable: false,
  })
  dateOfBirth: Date;

  @ApiProperty({
    example: 'Male',
    description: 'Gender - Male or Female',
  })
  @Column({
    nullable: false,
  })
  gender: string;

  @ApiProperty({
    example: '+93',
    description: 'Country code',
  })
  @Column({
    nullable: false,
  })
  countryCode: string;

  @ApiProperty({
    example: '1111111111',
    description: 'The phone number (without country code)',
  })
  @Column({
    nullable: false,
  })
  phoneNumber: number;

  @ApiProperty({
    example: 'USA',
    description: 'Citizenship',
  })
  @Column({
    nullable: false,
  })
  citizenship: string;

  constructor(partial: Partial<UserEntity | CreateUserDto>) {
    Object.assign(this, partial);
  }

  async create(createUserDto: CreateUserDto) {
    this.id = uuidv4();

    this.dateOfBirth = new Date(createUserDto.dateOfBirth);
    this.gender = createUserDto.gender.toLocaleLowerCase();

    this.password = await bcrypt.hash(
      createUserDto.password,
      Number(BCRYPT_SALT),
    );

    return this;
  }

  async validatePassword(password: string): Promise<boolean> {
    const isPasswordCorrect = await bcrypt.compare(password, this.password);

    return isPasswordCorrect;
  }
}
