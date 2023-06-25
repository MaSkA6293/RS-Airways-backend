import { ApiProperty } from '@nestjs/swagger';
import { Price } from './price.model';

export class BaggagePrice {
  constructor(priceInEuro: number) {
    this.light = new Price(priceInEuro);
    this.medium = new Price(priceInEuro + 5);
    this.heavy = new Price(priceInEuro + 8);
  }

  @ApiProperty({
    example: { eur: 5, usd: 6, rub: 450, pln: 23 },
    description: '8 kg',
  })
  light: Price;

  @ApiProperty({
    example: { eur: 10, usd: 10.8, rub: 900, pln: 45 },
    description: '12 kg',
  })
  medium: Price;

  @ApiProperty({
    example: { eur: 13, usd: 14, rub: 1170, pln: 59 },
    description: '25 kg',
  })
  heavy: Price;
}

export type BaggagePriceKeys = keyof typeof BaggagePrice;
