import { ApiProperty } from '@nestjs/swagger';

export class Price {
  constructor(priceInEuro: number) {
    this.eur = priceInEuro;
    this.usd = this.getUsdPrice();
    this.rub = this.getRubPrice();
    this.pln = this.getPlnPrice();
  }

  @ApiProperty({
    example: 100,
    description: 'Price in Euro',
  })
  eur: number;

  @ApiProperty({
    example: 120,
    description: 'Price in USD',
  })
  usd: number;

  @ApiProperty({
    example: 15000,
    description: 'Price Rubles',
  })
  rub: number;

  @ApiProperty({
    example: 320,
    description: 'Price in Polish Zloty',
  })
  pln: number;

  private getUsdPrice() {
    return Math.round(this.eur * 1.08);
  }

  private getRubPrice() {
    return Math.round(this.eur * 90);
  }

  private getPlnPrice() {
    return Math.round(this.eur * 4.5);
  }
}
