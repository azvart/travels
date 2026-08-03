import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindOneQuestDto {
  @Field(() => ID)
  public id!: string;
}
