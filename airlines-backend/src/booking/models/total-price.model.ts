import { ApiProperty } from '@nestjs/swagger';
import { Fare } from './fare.model';
import { Price } from 'src/flight/models/price.model';

export class TotalPrice {
  @ApiProperty({
    example: 1,
    description: 'Count of adult passengers',
  })
  adult: Fare[];

  @ApiProperty({
    example: 1,
    description: 'Count of child passengers',
  })
  children: Fare[];

  @ApiProperty({
    example: 1,
    description: 'Count of infant passengers',
  })
  infant: Fare[];

  total: Price;

  setTotalPrice(total: number) {
    this.total = new Price(total);
    return this;
  }

  addTotalPrice(priceToAdd) {
    const { eur: totalPrice } = this.total;

    this.setTotalPrice(priceToAdd + totalPrice);
  }
}
