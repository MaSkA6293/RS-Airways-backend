import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Price } from 'src/flight/models/price.model';

export class Fare {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Price)
  fare: Price;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Price)
  taxServicesCharge: Price;

  addFare(fare: number) {
    if (this.fare instanceof Price) {
      this.fare = new Price(this.fare.eur + fare);
      return;
    }
    this.fare = new Price(fare);
  }

  addTaxServiceCharge(taxServicesCharge: number) {
    if (this.taxServicesCharge instanceof Price) {
      this.taxServicesCharge = new Price(
        this.taxServicesCharge.eur + taxServicesCharge,
      );
      return;
    }
    this.taxServicesCharge = new Price(taxServicesCharge);
  }
}
