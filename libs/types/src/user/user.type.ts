import { ObjectType, Field, ID, OmitType } from '@nestjs/graphql';
import { Account } from '@app/types/account';

@ObjectType()
export class User {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public accountId!: string;

  @Field(() => String, { nullable: true })
  public firstName?: string;

  @Field(() => String, { nullable: true })
  public lastName?: string;

  @Field(() => Number, { nullable: true })
  public age?: number;

  @Field(() => Account, { nullable: true })
  public account?: Account;
}
