import {
  Controller,
  Post,
  Body,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserIdRequest } from './interfaces/UserIdRequest.interface';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: UserIdRequest,
  ) {
    const order = await this.bookingService.create(createOrderDto, req);

    if (!order)
      throw new HttpException(`User is not found`, HttpStatus.BAD_REQUEST);

    return order;
  }
}
