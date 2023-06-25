import {
  Controller,
  Post,
  Body,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserIdRequest } from './interfaces/UserIdRequest.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, type: OrderEntity })
  @Post()
  @HttpCode(201)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: UserIdRequest,
  ) {
    const order = await this.bookingService.create(createOrderDto, req);

    if (!order) throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);

    return order;
  }

  @ApiOperation({ summary: "Get all user's orders" })
  @ApiResponse({ status: 200, type: Array<OrderEntity> })
  @Get()
  async get(@Request() req: UserIdRequest) {
    const orders = await this.bookingService.getAll(req);

    if (!orders)
      throw new HttpException(`User is not found`, HttpStatus.BAD_REQUEST);

    return orders;
  }
}
