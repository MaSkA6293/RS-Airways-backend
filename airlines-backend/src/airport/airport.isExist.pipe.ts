import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces/interfaces';
import { notFoundError } from 'src/utils/utils';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportEntity } from './entities/airport.entity';

@Injectable()
export class AirportIsExistPipe
  implements PipeTransform<string, Promise<string>>
{
  constructor(
    @InjectRepository(AirportEntity)
    private artistRepository: Repository<AirportEntity>,
  ) {}

  async transform(uuid: string) {
    const airport = await this.artistRepository.findOne({
      where: { id: uuid },
    });

    if (!airport) notFoundError(entity.airport);

    return airport.id;
  }
}
