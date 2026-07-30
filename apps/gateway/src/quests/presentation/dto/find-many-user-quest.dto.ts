import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IFindManyUserQuests, QuestStatusEnum } from 'libs/interfaces';


registerEnumType(QuestStatusEnum, {
  name: 'QuestStatusEnum',
});

@InputType()
export class FindManyUserQuestDto implements IFindManyUserQuests {

  @Field(() => ID, { nullable: true })
  public questId?: string;

  @Field(()=> QuestStatusEnum, { nullable: true })
  public status?: QuestStatusEnum;
}
