import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TokenType {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public token!: string;
}
