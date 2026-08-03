import { Field, ObjectType } from '@nestjs/graphql';
import { IGetUser } from 'libs/interfaces';

@ObjectType()
export class GetAccountFromTokenOutput implements IGetUser {
  @Field(() => String)
  public accountId!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public email!: string;
}
