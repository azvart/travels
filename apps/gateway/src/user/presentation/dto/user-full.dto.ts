import { ObjectType, Field, PickType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.dto';
import { IUser, UserRoleEnum } from 'libs/interfaces';

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});

@ObjectType()
export class UserFull
  extends PickType(User, ['id', 'age', 'firstName', 'lastName'])
  implements IUser
{
  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public countryCode?: string;

  @Field(() => String, { nullable: true })
  public street?: string;

  @Field(() => String, { nullable: true })
  public city?: string;

  @Field(() => UserRoleEnum)
  public role: UserRoleEnum;
}
