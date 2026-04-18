import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetAccountFromTokenOutput {
  @Field(() => String)
  public accountId!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public email!: string;
}
