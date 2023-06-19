import { ApiProperty } from '@nestjs/swagger';
import { Price } from './price.model';

export class PassengerPrice {
  constructor(priceInEuro: number) {
    this.adult = new Price(priceInEuro);
    this.child = new Price(priceInEuro * 0.7);
    this.infant = new Price(priceInEuro * 0.2);
  }

  @ApiProperty({
    example: { eur: 5, usd: 6, rub: 450, pln: 23 },
    description: 'Adult price',
  })
  adult: Price;

  @ApiProperty({
    example: { eur: 10, usd: 10.8, rub: 900, pln: 45 },
    description: 'Children price',
  })
  child: Price;

  @ApiProperty({
    example: { eur: 13, usd: 14, rub: 1170, pln: 59 },
    description: 'Infant price',
  })
  infant: Price;
}
