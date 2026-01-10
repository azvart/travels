import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@app/types/user';

@ObjectType()
export class Account {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public email!: string;

  @Field(() => String)
  public password!: string;

  @Field(() => String)
  public registrationType!: string;

  @Field(() => User, { nullable: true })
  public user!: User;
}
