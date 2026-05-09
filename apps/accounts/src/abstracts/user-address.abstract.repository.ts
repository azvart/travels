import { UserAddressDto } from '@app/dto';

export abstract class UserAddressAbstractRepository {
  abstract save(
    userId: string,
    userAddress?: Pick<UserAddressDto, 'id'>,
  ): Promise<void>;

  abstract updateOne(
    userId: string,
    updatedUserAddressData: Partial<Omit<UserAddressDto, 'userId'>>,
  ): Promise<UserAddressDto | null>;

  abstract findByUserId(userId: string): Promise<UserAddressDto | null>;
}
