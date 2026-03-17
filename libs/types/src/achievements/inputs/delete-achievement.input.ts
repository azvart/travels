import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class DeleteAchievementInput {
  @Field(() => ID)
  public id!: string;
}
