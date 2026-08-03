import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AttachQuestToUserDto {
  @Field(() => ID)
  public questId!: string;
}
