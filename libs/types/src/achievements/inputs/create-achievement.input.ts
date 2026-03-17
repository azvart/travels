import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAchievementInput {
  @Field(() => String)
  public name!: string;

  @Field(() => Number)
  public points!: number;
}
