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

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const order = await this.bookingService.create(createOrderDto, req);

    if (!order)
      throw new HttpException(`User is not found`, HttpStatus.NOT_FOUND);

    return order;
  }
}
