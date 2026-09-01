import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ICreateQuest } from 'libs/interfaces';
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

@InputType()
export class CreateQuestDto implements ICreateQuest {
  @Field(() => String)
  public questName: string;

  @Field(() => String)
  public questDescription!: string;

  @Field(() => questCondition)
  public questCondition!: questCondition;

  @Field(() => questField)
  public questField: questField;

  @Field(() => Number)
  public questFinishResults: number;

  @Field(() => String)
  public questCountry!: string;

  @Field(() => String)
  public questReward!: string;

  @Field(() => questType)
  public questType!: questType;
}
