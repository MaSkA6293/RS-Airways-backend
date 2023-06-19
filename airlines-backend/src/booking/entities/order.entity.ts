import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Trip } from '../models/trip.model';

@Entity('order')
export class OrderEntity {
  @ApiProperty({
    example: '26bb1722-38dd-42eb-b6fa-6cae47c5b585',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: `{ order: [
      {
        passengers: Passengers,
        flights: Flights[],
        totalPrice: TotalPrice
      }
    ]`,
    description: 'All trips that was booked in one payment',
  })
  order: string;

  @ManyToOne(() => UserEntity, (user) => user.bookedTrips, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  create(trips: Trip[], user: UserEntity) {
    this.id = uuidv4();
    this.order = JSON.stringify(trips);
    this.user = user;
    return this;
  }
}
