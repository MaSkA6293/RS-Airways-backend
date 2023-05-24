import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from '../interfaces/interfaces';

export const notFoundError = (
  name: entity,
  code: HttpStatus = HttpStatus.NOT_FOUND,
) => {
  throw new HttpException(`record with id === ${name}Id doesn't exist`, code);
};
