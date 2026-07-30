import { InputType, Field, ID } from '@nestjs/graphql';
import { IDeleteQuest } from 'libs/interfaces';


@InputType()
export class DeleteOneQuestInputDto implements IDeleteQuest {
  @Field(() => ID)
  public id!: string;
}
