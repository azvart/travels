import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IQuest, QUEST_TYPE } from 'libs/interfaces';
import { UserQuestDto } from './user-quest.dto';

registerEnumType(QUEST_TYPE, {
  name: 'QuestType',
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

  @Field(() => String)
  public questCondition!: string;

  @Field(() => QUEST_TYPE, { nullable: true })
  public questType?: QUEST_TYPE;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  public attached: boolean;
}
