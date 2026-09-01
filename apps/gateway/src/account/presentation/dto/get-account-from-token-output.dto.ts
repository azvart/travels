import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IGetUser, UserRoleEnum } from 'libs/interfaces';

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});

@ObjectType()
export class GetAccountFromTokenOutput implements IGetUser {
  @Field(() => String)
  public accountId!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public email!: string;

  @Field(() => UserRoleEnum)
  public role!: UserRoleEnum;
}
