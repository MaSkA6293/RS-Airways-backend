import { Injectable } from '@nestjs/common';
import { UserIdRequest } from './interfaces/UserIdRequest.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';
import { TripService } from './trip.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(OrderEntity)
    private bookingRepository: Repository<OrderEntity>,
    private userService: UserService,
    private tripService: TripService,
  ) {}
  async create(
    { order }: CreateOrderDto,
    { userId }: UserIdRequest,
  ): Promise<{ errorMessage: string; order: OrderEntity | undefined }> {
    const user = await this.userService.findOne(userId);

    if (!user) return { errorMessage: 'User is not found', order: undefined };

    const trips = await this.tripService.create(order);

    if (!trips.every((trip) => trip !== undefined))
      return { errorMessage: 'Trip create data is invalid', order: undefined };

    const createdOrder = await this.bookingRepository.save(
      new OrderEntity().create(trips, user),
    );

    if (!createdOrder)
      return {
        errorMessage: 'Database save operation failed',
        order: undefined,
      };

    return { errorMessage: '', order: createdOrder };
  }

  async getAll({ userId }: UserIdRequest): Promise<OrderEntity[]> {
    const user = await this.userService.findOne(userId);

    if (!user) return undefined;

    return await this.bookingRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: { id: userId },
      },
    });
  }
}
