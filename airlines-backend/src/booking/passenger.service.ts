import { Injectable } from '@nestjs/common';
import { Passenger } from './models/passenger.model';
import { CreatePassengersDto } from './dto/create-passengers.dto';

@Injectable()
export class PassengerService {
  async create(passengers: CreatePassengersDto): Promise<Passenger[]> {
    return await this.createPassengers(passengers);
  }

  async createPassengers(
    passengers: CreatePassengersDto,
  ): Promise<Passenger[]> {
    const result = {};

    Object.keys(passengers)
      .filter((item) => {
        return passengers[item].length > 0 ? true : false;
      })
      .forEach((key) => {
        result[key] = passengers[key].map((item) =>
          new Passenger().create(item),
        );
      });

    return result as Passenger[];
  }
}
