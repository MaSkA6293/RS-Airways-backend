import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsISO8601,
  Validate,
  Length,
  IsNumber,
} from 'class-validator';
import { CustomGenderValidator } from '../CustomGenderValidator';
import { Min } from 'class-validator';
import { Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(5, 20)
  password: string;

  @IsString()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @Length(3, 20)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  @Validate(CustomGenderValidator)
  gender: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsNumber()
  @Min(1000000000, { message: 'The Phone number field must be 10 digits long' })
  @Max(9999999999, {
    message: 'The Phone number field must be 10 digits long',
  })
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  citizenship: string;
}
