import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IQuest, QUEST_CONDITION, QUEST_FIELD, QUEST_TYPE } from 'libs/interfaces';
import { questType, questCondition, questField } from '@app/proto/generated/quest/quest';

registerEnumType(questType, {
  name: 'QuestType',
});

registerEnumType(questCondition, {
  name: 'QuestCondition',
});

registerEnumType(questField, {
  name: 'QuestField',
});

@ObjectType()
export class QuestDto implements IQuest {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public questDescription!: string;

  @Field(() => String)
  public questName!: string;

  @Field(() => String)
  public questCountry!: string;

  @Field(() => String)
  public questReward!: string;

  @Field(() => questCondition)
  public questCondition!: questCondition;

  @Field(() => questType)
  public questType!: questType;

  @Field(() => Number)
  public questFinishResults!: number;

  @Field(() => questField)
  public questField!: questField;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  public attached: boolean;
}
