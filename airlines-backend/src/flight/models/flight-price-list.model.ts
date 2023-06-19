import { ApiProperty } from '@nestjs/swagger';
import { Price } from './price.model';
import { BaggagePrice } from './baggage-price.model';
import { BAGGAGE_TARIFF } from '../constants';
import { PassengerPrice } from './passenger-price.model';

export class FlightPriceList {
  constructor(priceInEuro: number) {
    this.flight = new PassengerPrice(priceInEuro);
    this.specialAssistance = new Price(priceInEuro * 0.04);
    this.baggage = new BaggagePrice(BAGGAGE_TARIFF);
  }

  @ApiProperty({
    example: { eur: 73, usd: 79, rub: 6570, pln: 329 },
    description: 'The price of the flight',
  })
  flight: PassengerPrice;

  @ApiProperty({
    example: { eur: 2.9, usd: 3, rub: 263, pln: 13 },
    description: 'The price of the special assistance',
  })
  specialAssistance: Price;

  @ApiProperty({
    example: {
      light: { eur: 5, usd: 5, rub: 450, pln: 23 },
      medium: { eur: 10, usd: 11, rub: 900, pln: 45 },
      heavy: { eur: 13, usd: 14, rub: 1170, pln: 59 },
    },
    description: 'The price of the luggage',
  })
  baggage: BaggagePrice;
}
