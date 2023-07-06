import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Trip } from '../models/trip.model';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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
