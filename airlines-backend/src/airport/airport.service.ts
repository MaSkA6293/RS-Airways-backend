import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AirportEntity } from './entities/airport.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAirportDto } from './dto/create-airport.dto';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportEntity)
    private airportsRepository: Repository<AirportEntity>,
  ) {}

  async findAll(): Promise<AirportEntity[] | []> {
    return this.airportsRepository.find();
  }

  async create(createAirportDto: CreateAirportDto): Promise<AirportEntity> {
    const airport = new AirportEntity().create(createAirportDto);

    const createdAirport = await this.airportsRepository.save(airport);

    return createdAirport;
  }

  async remove(id: string): Promise<void> {
    await this.airportsRepository.delete(id);
  }

  async getAirportsById(
    fromId: string,
    toId: string,
  ): Promise<{ from: AirportEntity; to: AirportEntity }> {
    const data = [fromId, toId].map((id: string) =>
      this.airportsRepository.findOne({
        where: {
          id,
        },
      }),
    );

    const [from, to] = await Promise.all(data);

    return { from, to };
  }

  async findOneByGPS(gps: string): Promise<AirportEntity | undefined> {
    return await this.airportsRepository.findOne({ where: { gps } });
  }

  async removeAll(): Promise<void> {
    await this.airportsRepository.query('TRUNCATE TABLE airport CASCADE');
  }
}
