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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from './models/order.model';

@Controller('booking')
@ApiTags('Booking')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, type: OrderModel })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token is invalid',
  })
  @Post()
  @HttpCode(201)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: UserIdRequest,
  ): Promise<OrderModel> {
    try {
      const createOrder = await this.bookingService.create(createOrderDto, req);

      const { errorMessage, order } = createOrder;

      if (errorMessage === '') return order as unknown as OrderModel;

      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    } catch {
      throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: "Get all user's orders" })
  @ApiResponse({ status: 200, type: OrderModel })
  @ApiResponse({
    status: 400,
    description: 'Bad request, the user is not found',
  })
  @Get()
  async get(@Request() req: UserIdRequest): Promise<OrderEntity[]> {
    const orders = await this.bookingService.getAll(req);

    if (orders) return orders;

    throw new HttpException(`User is not found`, HttpStatus.BAD_REQUEST);
  }
}
