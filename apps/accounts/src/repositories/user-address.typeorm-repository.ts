import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddressAbstractRepository } from '../abstracts/user-address.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { UserAddressDto } from '@app/dto';

@Injectable()
export class UserAddressTypeormRepository
  implements UserAddressAbstractRepository
{
  public constructor(
    @InjectRepository(UserAddressOrmEntity)
    public readonly userAddressRepository: Repository<UserAddressOrmEntity>,
  ) {}

  public async save(userId: string, userAddress?: Pick<UserAddressDto, 'id'>) {
    await this.userAddressRepository.save(
      this.userAddressRepository.create({
        user: {
          id: userId,
        },
        ...userAddress,
      }),
    );
  }

  public async updateOne(
    updatedId: string,
    userAddress: Partial<Omit<UserAddressDto, 'userId' | 'user'>>,
  ): Promise<UserAddressDto | null> {
    console.log('REPO UPDATED ONE', updatedId, userAddress);
    const orm = await this.userAddressRepository.update(
      {
        id: updatedId,
      },
      { ...userAddress },
    );
    if (orm.affected && orm.affected < 1) {
      throw new Error('User Address not updated');
    }
    const userAddressEntity = await this.userAddressRepository.findOne({
      where: {
        id: updatedId,
      },
      relations: {
        user: true,
      },
    });

    if (!userAddress) {
      throw new NotFoundException('User Address not found');
    }

    return UserAddressDto.fromEntity(userAddressEntity);
  }

  public async findByUserId(userId: string): Promise<UserAddressDto | null> {
    const orm = await this.userAddressRepository.findOne({
      where: {
        userId,
      },
    });
    return UserAddressDto.fromEntity(orm);
  }
}
