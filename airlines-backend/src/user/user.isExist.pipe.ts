import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces/interfaces';
import { notFoundError } from 'src/utils';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserIsExistPipe
  implements PipeTransform<string, Promise<UserEntity>>
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async transform(uuid: string) {
    const user = await this.userRepository.findOneBy({
      id: uuid,
    });

    if (!user) notFoundError(entity.user);

    return user;
  }
}
