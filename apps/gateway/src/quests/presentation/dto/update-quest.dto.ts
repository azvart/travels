import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUpdateQuest, QUEST_TYPE } from 'libs/interfaces';


registerEnumType(QUEST_TYPE, {
  name: 'QuestType'
})

@InputType()
export class UpdateQuestDto implements IUpdateQuest {

  @Field(() => ID)
  public id!: string;


  @Field(() => String, { nullable: true })
  public questName?: string;


  @Field(() => String, { nullable: true })
  public questDescription?: string;

  @Field(() => String, { nullable: true })
  public questCondition?: string;

  @Field(() => String, { nullable: true })
  public questCountry?: string;

  @Field(() => String, { nullable: true })
  public questReward?: string;

  @Field(() => QUEST_TYPE, { nullable: true })
  public questType?: QUEST_TYPE;
}
