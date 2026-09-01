import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Account } from '../../../account';
import { IUser, UserRoleEnum } from 'libs/interfaces';

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public firstName?: string;

  @Field(() => String, { nullable: true })
  public lastName?: string;

  @Field(() => Number, { nullable: true })
  public age?: number;

  @Field(() => String, { nullable: true })
  country?: string;
  @Field(() => String, { nullable: true })
  countryCode?: string;
  @Field(() => String, { nullable: true })
  street?: string;
  @Field(() => String, { nullable: true })
  city?: string;
  @Field(() => UserRoleEnum)
  public role: UserRoleEnum;
  @Field(() => Account, { nullable: true })
  public account?: Account;
}
