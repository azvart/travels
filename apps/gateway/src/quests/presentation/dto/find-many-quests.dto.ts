import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IFindManyQuests } from 'libs/interfaces';
import { questType } from '@app/proto/generated/quest/quest';

registerEnumType(questType, {
  name: 'QuestType',
});

@InputType()
export class FindManyQuestsDto implements IFindManyQuests {
  @Field(() => String, { nullable: true })
  public questCountry?: string;

  @Field(() => questType, { nullable: true })
  public questType?: questType;
}
