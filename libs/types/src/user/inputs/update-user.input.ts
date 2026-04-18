import { ID, InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public firstName?: string;

  @Field(() => String, { nullable: true })
  public lasName?: string;

  @Field(() => Number, { nullable: true })
  public age?: number;
}
