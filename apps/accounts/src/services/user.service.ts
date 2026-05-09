import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../abstracts/user.abstract.repository';
import { User, UserAddressDto } from '@app/dto';
import { v4 as uuid } from 'uuid';
import { UserAddressAbstractRepository } from '../abstracts/user-address.abstract.repository';
import { UserRedisService } from '@app/redis';
@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserAbstractRepository,
    private readonly userAddressRepository: UserAddressAbstractRepository,
    private readonly userRedisService: UserRedisService,
  ) {}

  public async createNewUser(accountId: string) {
    const user = new User(uuid(), accountId);
    await this.userRepository.save(user);
    await this.userAddressRepository.save(user.id);
    const userAddress = await this.userAddressRepository.findByUserId(user.id);
    await this.userRedisService.setUser(`${user.id}`, {
      ...user,
      ...userAddress,
    });
    return this.userRepository.findByAccountId(user.accountId);
  }

  public async findByAccountId(accountId: string) {
    return this.userRepository.findByAccountId(accountId);
  }

  public async updateUser(
    userId: string,
    updatedData: { firstName: string; lastName: string; age: number },
  ) {
    return this.userRepository.updateUserById(userId, updatedData);
  }

  public async updateUserAddress(
    id: string,
    addressData: Partial<Omit<UserAddressDto, 'id' | 'userId'>>,
  ) {
    const userAddressDto = await this.userAddressRepository.updateOne(
      id,
      addressData,
    );
    await this.userRedisService.setUser(`${userAddressDto?.userId}`, {
      ...userAddressDto,
    });
    return userAddressDto;
  }
}
