import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces/interfaces';
import { notFoundError } from 'src/utils';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightEntity } from './entities/flight.entity';

@Injectable()
export class FlightIsExistPipe
  implements PipeTransform<string, Promise<FlightEntity>>
{
  constructor(
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
  ) {}

  async transform(uuid: string) {
    const flight = await this.flightRepository.findOne({
      where: { id: uuid },
    });

    if (!flight) notFoundError(entity.airport);

    return flight;
  }
}
