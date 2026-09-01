import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';
import { questStatus } from '@app/proto/generated/quest/quest';

registerEnumType(questStatus, {
  name: 'QuestStatusEnum',
});

@ObjectType()
export class QuestSubscriptionDto implements Pick<
  IUserQuest,
  'questId' | 'progress' | 'finishResult' | 'status'
> {
  @Field(() => ID)
  public questId!: string;

  @Field(() => Number)
  public progress!: number;

  @Field(() => questStatus)
  public status!: questStatus;

  @Field(() => Number)
  public finishResult!: number;
}
