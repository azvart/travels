import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';


registerEnumType(QuestStatusEnum, {
  name: 'QuestStatusEnum'
})

@ObjectType()
export class QuestSubscriptionDto
  implements Pick<IUserQuest, 'questId' | 'progress' | "finishResult" | 'status'> {

  @Field(()=> ID)
  public questId!: string;

  @Field(() => Number)
  public progress!: number;

  @Field(() => QuestStatusEnum)
  public status!: QuestStatusEnum;


  @Field(() => Number)
  public finishResult!: number;

}
