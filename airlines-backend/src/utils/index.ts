import { HttpException, HttpStatus, LogLevel } from '@nestjs/common';
import { entity } from '../interfaces/interfaces';
import { PLANE_SPEED, TARIFF } from 'src/flight/constants';
import { FlightEntity } from 'src/flight/entities/flight.entity';

import { EOL } from 'os';

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

export const getUncaughtExceptionLog = (err, origin, short = true) => {
  if (short) {
    return `${EOL}Date: ${new Date().toUTCString()},${EOL}Caught exception: ${err},${EOL}Exception origin: ${origin}${EOL}`;
  }
  return `${EOL}Date: ${new Date().toUTCString()},${EOL}Caught exception: ${err},${EOL}Exception origin: ${origin}${EOL}Stack:${EOL}${JSON.stringify(
    err.stack,
  )}${EOL}`;
};

export const getUnhandledRejectionLog = (reason, promise) => {
  return `${EOL}Date: ${new Date().toUTCString()},${EOL}Rejection: ${promise},${EOL}Reason: ${reason}${EOL}`;
};

export const getLoggingLevel = (level: string): LogLevel[] => {
  switch (level) {
    case '0': {
      return ['warn'];
    }
    case '1': {
      return ['log', 'error', 'verbose', 'warn'];
    }
    case '2': {
      return ['log', 'error', 'verbose', 'warn', 'debug'];
    }
  }
};
