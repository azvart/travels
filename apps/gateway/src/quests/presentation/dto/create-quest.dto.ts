import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ICreateQuest, QUEST_TYPE } from 'libs/interfaces';

registerEnumType(QUEST_TYPE, {
  name: 'QuestType',
});

@InputType()
export class CreateQuestDto implements ICreateQuest {
  @Field(() => String)
  public questName: string;

  @Field(() => String)
  public questDescription!: string;

  @Field(() => String)
  public questCondition!: string;

  @Field(() => String)
  public questCountry!: string;

  @Field(() => String)
  public questReward!: string;

  @Field(() => QUEST_TYPE, { nullable: true })
  public questType?: QUEST_TYPE;
}
