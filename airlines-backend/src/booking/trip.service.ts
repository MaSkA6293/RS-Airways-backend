import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/createTrip.dto';
import { Trip } from './models/trip.model';
import { PriceService } from './price.service';
import { PassengerService } from './passenger.service';
import { FlightService } from 'src/flight/flight.service';
import { FlightModel } from 'src/flight/models/flight-model';

@Injectable()
export class TripService {
  constructor(
    private priceService: PriceService,
    private passengerService: PassengerService,
    private flightService: FlightService,
  ) {}
  async create(order: CreateTripDto[]): Promise<Trip[]> {
    const trips = order.map(
      async ({ passengers, flights }: CreateTripDto): Promise<Trip> => {
        const parsedFlights = await this.parseFlights(flights);

        if (!this.checkFlightsItems(parsedFlights)) return undefined;

        const price = await this.priceService.getPrice(
          passengers,
          parsedFlights,
        );

        const registeredPassengers = await this.passengerService.create(
          passengers,
        );

        return {
          passengers: registeredPassengers,
          flights: parsedFlights,
          price,
        };
      },
    );

    return await Promise.all(trips);
  }

  async parseFlights(flight: string[]): Promise<FlightModel[]> {
    const flights = flight.map(async (item: string) => {
      try {
        const flight = await this.flightService.getFlightById(item);

        if (flight) {
          flight.price = await JSON.parse(flight.price);
          return flight;
        }
        return undefined;
      } catch {
        return undefined;
      }
    });

    return (await Promise.all(flights)) as unknown as FlightModel[];
  }

  checkFlightsItems(flights: FlightModel[]): boolean {
    if (!flights.every((i) => (i ? true : false))) {
      return false;
    }
    return true;
  }
}
