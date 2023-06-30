import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { OrderEntity } from 'src/booking/entities/order.entity';

const { BCRYPT_SALT } = process.env;

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    nullable: false,
  })
  gender: string;

  @Column({
    nullable: false,
  })
  countryCode: string;

  @Column({
    nullable: false,
  })
  phoneNumber: number;

  @Column({
    nullable: false,
  })
  citizenship: string;

  @OneToMany(() => OrderEntity, (bookedTrip) => bookedTrip.user, {
    cascade: true,
  })
  bookedTrips: OrderEntity[];

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
