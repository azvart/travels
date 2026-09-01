import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IFindManyUserQuests, QuestStatusEnum } from 'libs/interfaces';
import { questStatus } from '@app/proto/generated/quest/quest';

registerEnumType(questStatus, {
  name: 'QuestStatusEnum',
});

@InputType()
export class FindManyUserQuestDto implements IFindManyUserQuests {
  @Field(() => ID, { nullable: true })
  public questId?: string;

  @Field(() => questStatus, { nullable: true })
  public status?: questStatus;
}
