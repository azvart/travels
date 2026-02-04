import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../abstracts/user.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { User } from '@app/dto';

@Injectable()
export class UserTypeormRepository implements UserAbstractRepository {
  public constructor(
    @InjectRepository(UserOrmEntity)
    public readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  public async save(user: User) {
    await this.userRepository.save(
      this.userRepository.create({
        id: user.id,
        accountId: user.accountId,
      }),
    );
  }

  public async findByAccountId(accountId: string) {
    const orm = await this.userRepository.findOne({
      where: {
        accountId,
      },
    });

    return orm
      ? new User(orm.id, orm.accountId, orm.firstName, orm.lastName, orm.age)
      : null;
  }
}
