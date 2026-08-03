import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';
import { QuestDto } from './quest.dto';

registerEnumType(QuestStatusEnum, {
  name: 'QuestStatusEnum',
});

@ObjectType()
export class UserQuestDto implements IUserQuest {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public questId!: string;

  @Field(() => QuestStatusEnum)
  public status!: QuestStatusEnum;

  @Field(() => Number)
  public progress!: number;

  @Field(() => String)
  public finishResult!: number;

  @Field(() => Date, { nullable: true })
  public completedAt: Date;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => QuestDto, { nullable: true })
  public questEntity: QuestDto;
}
