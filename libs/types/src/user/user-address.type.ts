import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@app/types/user/user.type';

@ObjectType()
export class UserAddressType {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public countryCode?: string;

  @Field(() => String, { nullable: true })
  public street?: string;

  @Field(() => String, { nullable: true })
  public city?: string;

  @Field(() => User, { nullable: true })
  public user?: User;
}
