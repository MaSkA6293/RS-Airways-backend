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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'Password',
  })
  @Length(5, 20)
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsString()
  @Length(3, 20)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsString()
  @Length(3, 20)
  lastName: string;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Date of birthday',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  dateOfBirth: Date;

  @ApiProperty({
    example: 'Male',
    description: 'Gender - Male or Female',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(CustomGenderValidator)
  gender: string;

  @ApiProperty({
    example: '+93',
    description: 'Country code',
  })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty({
    example: '1111111111',
    description: 'The phone number (without country code)',
  })
  @IsNumber()
  @Min(1000000000, { message: 'The Phone number field must be 10 digits long' })
  @Max(9999999999, {
    message: 'The Phone number field must be 10 digits long',
  })
  phoneNumber: number;

  @ApiProperty({
    example: 'USA',
    description: 'Citizenship',
  })
  @IsString()
  @IsNotEmpty()
  citizenship: string;
}
