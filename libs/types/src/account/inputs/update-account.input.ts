import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public email?: string;

  @Field(() => String, { nullable: true })
  public password?: string;
}
