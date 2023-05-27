import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from '../interfaces/interfaces';
import { TARIFF } from 'src/flight/constants';

export const notFoundError = (
  name: entity,
  code: HttpStatus = HttpStatus.NOT_FOUND,
) => {
  throw new HttpException(`record with id === ${name}Id doesn't exist`, code);
};

export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPrice = (duration: number) => {
  return Math.floor(duration * TARIFF);
};
