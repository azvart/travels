import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IFindManyQuests, QUEST_TYPE } from 'libs/interfaces';

registerEnumType(QUEST_TYPE, {
  name: 'QuestType'
})


@InputType()
export class FindManyQuestsDto implements IFindManyQuests {

  @Field(() => String, { nullable: true })
  public questCountry?: string

  @Field(() => QUEST_TYPE, { nullable: true })
  public questType?: QUEST_TYPE

}


