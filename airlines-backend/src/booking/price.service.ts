import { Injectable } from '@nestjs/common';
import { CreatePassengersDto } from './dto/create-passengers.dto';
import { TotalPrice } from './models/total-price.model';
import { FlightEntity } from 'src/flight/entities/flight.entity';
import { Fare } from './models/fare.model';
import { FlightModel } from 'src/flight/models/flight-model';
import {
  BaggagePrice,
  BaggagePriceKeys,
} from 'src/flight/models/baggage-price.model';
import { PassengerType } from './interfaces/Passenger-type';

@Injectable()
export class PriceService {
  async getPrice(
    passengers: CreatePassengersDto,
    flights: FlightModel[],
  ): Promise<TotalPrice> {
    const totalPrice = new TotalPrice();

    const passengerKeys = Object.keys(passengers);

    if (!this.checkPassengers(passengerKeys)) return undefined;

    passengerKeys.forEach((passengerType, index) => {
      totalPrice[passengerType] = passengers[passengerType].map((passenger) => {
        const fare = new Fare();

        flights.forEach(
          ({
            price: {
              flight: flightPrice,
              specialAssistance: { eur: specialAssistancePrice },
              baggage: flightBaggagePrice,
            },
          }: FlightModel) => {
            const flightPriceEur = flightPrice[passengerType]['eur'];

            const baggageTotalEur = this.calculateBaggagePrice(
              passengers,
              passengerType as BaggagePriceKeys,
              index,
              flightBaggagePrice,
            );

            const fareItems = [flightPriceEur, baggageTotalEur];

            const totalFare = this.calculateFare(fareItems);

            fare.addFare(totalFare);
            if (passenger['specialAssistance']) {
              fare.addTaxServiceCharge(specialAssistancePrice);
            }
          },
        );

        return fare;
      });
    });

    return totalPrice;
  }

  async parseFlights(flights: FlightEntity[]): Promise<FlightModel[]> {
    const promises = flights.map(async (el) => {
      const copy = Object.assign({}, el);
      copy['price'] = JSON.parse(el['price']);
      return copy;
    });

    const result = await Promise.all(promises);

    return result as unknown as Promise<FlightModel[]>;
  }

  calculateBaggagePrice(
    passengers: CreatePassengersDto,
    key: BaggagePriceKeys,
    index: number,
    flightBaggagePrice: BaggagePrice,
  ): number {
    let baggageTotal = 0;

    const baggageKeys = Object.keys(passengers[key][index]['baggage']);

    baggageKeys.forEach((baggageKey) => {
      const count = passengers[key][index]['baggage'][baggageKey];
      const field = flightBaggagePrice[baggageKey]['eur'];

      baggageTotal += count * field;
    });
    return baggageTotal;
  }

  calculateFare(fares: number[]): number {
    return fares.reduce((prev, next) => prev + next);
  }

  checkPassengers(passengerKeys): boolean {
    return passengerKeys
      .map((i: string | number) =>
        typeof PassengerType[i] !== 'undefined' ? true : false,
      )
      .every((el: boolean) => (el ? true : false));
  }
}
