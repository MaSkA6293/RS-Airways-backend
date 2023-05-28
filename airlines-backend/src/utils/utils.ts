import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from '../interfaces/interfaces';
import { PLANE_SPEED, TARIFF } from 'src/flight/constants';
import { FlightEntity } from 'src/flight/entities/flight.entity';

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

export const getRandomDate = () => {
  const hour = getRandomIntInclusive(0, 23);
  const minute = getRandomIntInclusive(0, 59);

  return new Date().setHours(hour, minute);
};

export const getFlightDuration = (fromGps: string, toGps: string) =>
  new FlightEntity().getDistance(fromGps, toGps) / PLANE_SPEED;
