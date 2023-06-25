import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { OrderEntity } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TripService } from './trip.service';
import { PriceService } from './price.service';
import { PassengerService } from './passenger.service';
import { FlightService } from 'src/flight/flight.service';
import { FlightEntity } from 'src/flight/entities/flight.entity';
import { AirportService } from 'src/airport/airport.service';
import { AirportEntity } from 'src/airport/entities/airport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      FlightEntity,
      AirportEntity,
    ]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET_KEY,
    }),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    UserService,
    TripService,
    FlightService,
    PriceService,
    PassengerService,
    AirportService,
  ],
})
export class BookingModule {}
