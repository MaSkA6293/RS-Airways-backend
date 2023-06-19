import { Injectable } from '@nestjs/common';
import { UserIdRequest } from './interfaces/UserIdRequest.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';
import { Passenger } from './models/passenger.model';
import { CreatePassengersDto } from './dto/create-passengers.dto';
import { CreateTripDto } from './dto/createTrip.dto';
import { TotalPrice } from './models/total-price.model';
import { FlightEntity } from 'src/flight/entities/flight.entity';
import { Trip } from './models/trip.model';
import { FlightPriceList } from 'src/flight/models/flight-price-list.model';
import { Price } from 'src/flight/models/price.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(OrderEntity)
    private bookingRepository: Repository<OrderEntity>,
    private userService: UserService,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
    req: UserIdRequest,
  ): Promise<OrderEntity> {
    const { userId } = req;

    const user = await this.userService.findOne(userId);

    if (!user) return undefined;

    const { order } = createOrderDto;

    const trips = order.map((trip: CreateTripDto): Trip => {
      const { passengers, flights } = trip;

      return {
        passengers: this.createPassengers(passengers),
        flights,
        price: this.getPrice(passengers, flights),
      };
    });

    const createdOrder = await this.bookingRepository.save(
      new OrderEntity().create(trips, user),
    );

    return createdOrder;
  }

  createPassengers(passengers: CreatePassengersDto) {
    return Object.keys(passengers).map((key) =>
      new Passenger().create(passengers[key]),
    );
  }

  getPrice(
    passengers: CreatePassengersDto,
    flights: FlightEntity[],
  ): TotalPrice {
    const keys = Object.keys(passengers);

    const totalPrice = new TotalPrice();

    let total = 0;
    keys.forEach((key) => {
      totalPrice[key] = flights.map((flight) => {
        const price = flight.price as unknown as FlightPriceList;

        const fare = new Price(price.flight.eur);
        const taxServicesCharge = new Price(price.specialAssistance.eur);

        total += fare.eur + taxServicesCharge.eur;
        return {
          fare,
          taxServicesCharge,
        };
      });
    });
    totalPrice['total'] = new Price(total);

    return totalPrice;
  }
}
