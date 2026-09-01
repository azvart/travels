import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUpdateQuest } from 'libs/interfaces';
import { questCondition, questType, questField } from '@app/proto/generated/quest/quest';

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
export class UpdateQuestDto implements IUpdateQuest {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public questName?: string;

  @Field(() => String, { nullable: true })
  public questDescription?: string;

  @Field(() => questCondition, { nullable: true })
  public questCondition!: questCondition;

  @Field(() => String, { nullable: true })
  public questCountry?: string;

  @Field(() => String, { nullable: true })
  public questReward?: string;

  @Field(() => questField)
  public questField!: questField;

  @Field(() => questType, { nullable: true })
  public questType!: questType;
}
