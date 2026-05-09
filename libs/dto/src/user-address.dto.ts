import { UserAddressOrmEntity, UserOrmEntity } from '@app/entities/enity';
import { User } from '@app/dto/user.dto';

export class UserAddressDto {
  static fromEntity(userAddressEntity: UserAddressOrmEntity | null) {
    return userAddressEntity
      ? new UserAddressDto(
          userAddressEntity.id,
          userAddressEntity.userId,
          userAddressEntity.country,
          userAddressEntity.countryCode,
          userAddressEntity.street,
          userAddressEntity.city,
          userAddressEntity.user,
        )
      : null;
  }

  static fromRedisEntity(userAddressRedisEntity: any) {
    return new UserAddressDto(
      userAddressRedisEntity._id,
      userAddressRedisEntity._userId,
      userAddressRedisEntity._country,
      userAddressRedisEntity._countryCode,
      userAddressRedisEntity._street,
      userAddressRedisEntity._city,
      userAddressRedisEntity._user,
    );
  }

  public constructor(
    private readonly _id: string,
    private readonly _userId?: string,
    private readonly _country?: string,
    private readonly _countryCode?: string,
    private readonly _street?: string,
    private readonly _city?: string,
    private readonly _user?: UserOrmEntity,
  ) {}

  get id() {
    return this._id;
  }

  get country() {
    return this._country;
  }
  get countryCode() {
    return this._countryCode;
  }
  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get user() {
    return User.fromEntity(this._user);
  }
  get userId() {
    return this._userId;
  }
}
