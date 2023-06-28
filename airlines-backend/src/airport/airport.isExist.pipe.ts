import { PipeTransform, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportEntity } from './entities/airport.entity';

@Injectable()
export class AirportIsExistPipe
  implements PipeTransform<string, Promise<AirportEntity>>
{
  constructor(
    @InjectRepository(AirportEntity)
    private artistRepository: Repository<AirportEntity>,
  ) {}

  async transform(uuid: string): Promise<AirportEntity | undefined> {
    const airport = await this.artistRepository.findOne({
      where: { id: uuid },
    });

    if (!airport) undefined;

    return airport;
  }
}
