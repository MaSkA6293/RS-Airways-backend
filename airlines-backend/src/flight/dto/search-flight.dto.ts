import { IsString, IsNotEmpty, ValidateIf, IsUUID } from 'class-validator';

export class SearchFlightDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  fromId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  toId: string;

  @IsNotEmpty()
  @IsString()
  forwardDate: string;

  @ValidateIf((o) => o.otherProperty === 'undefined')
  @IsNotEmpty()
  backDate?: string;
}
