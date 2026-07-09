import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAbstractRepository } from '../abstracts/user.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressOrmEntity, UserOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { User } from '@app/dto';
import { UserAddressTypeormRepository } from './user-address.typeorm-repository';

@Injectable()
export class UserTypeormRepository implements UserAbstractRepository {
  public constructor(
    @InjectRepository(UserOrmEntity)
    public readonly userRepository: Repository<UserOrmEntity>,
    @InjectRepository(UserAddressOrmEntity)
    public readonly userAddressRepository: Repository<UserAddressOrmEntity>,
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

    return orm ? new User(orm.id, orm.accountId, orm.firstName, orm.lastName, orm.age) : null;
  }

  public async updateUserById(
    userId: string,
    updatedData: { firstName: string; lastName: string; age: number },
  ) {
    const orm = await this.userRepository.update(
      {
        id: userId,
      },
      { ...updatedData },
    );
    if (orm.affected && orm.affected < 1) {
      throw new Error('User not updated');
    }
    const userEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        account: true,
      },
    });
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    return User.fromEntity(userEntity);
  }
  public async getUserById(userId: string) {
    const userFull = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if(!userFull){
      throw new Error(`User with id: ${userId} not found`)
    }
    const userAddress = await this.userAddressRepository.findOne({
      where: {
        userId: userId,
      },
    });

    return {
      id: userFull.id,
      accountId: userFull.accountId,
      firstName: userFull?.firstName,
      lastName: userFull?.lastName,
      age: userFull?.age,
      country: userAddress?.country,
      countryCode: userAddress?.countryCode,
      street: userAddress?.street,
      city: userAddress?.city
    }
  }
}
