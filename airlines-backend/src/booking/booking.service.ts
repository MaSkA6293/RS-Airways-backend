import { Injectable } from '@nestjs/common';
import { UserIdRequest } from './interfaces/UserIdRequest.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(OrderEntity)
    private bookingRepository: Repository<OrderEntity>,
    private userService: UserService,
  ) {}
  async create(createOrderDto: CreateOrderDto, req: UserIdRequest) {
    const { userId } = req;

    if (!userId) {
      return undefined;
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      return undefined;
    }

    return 'This action adds a new booking';
  }
}
