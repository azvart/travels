import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';
import { QuestDto } from './quest.dto';
import {
  questCondition,
  questField,
  questStatus,
  questType,
} from '@app/proto/generated/quest/quest';

registerEnumType(questStatus, {
  name: 'QuestStatusEnum',
});
registerEnumType(questCondition, {
  name:'QuestCondition'
})
registerEnumType(questField, {
  name: 'QuestField'
})
registerEnumType(questType, {
  name: 'QuestType'
})

@ObjectType()
export class UserQuestDto implements IUserQuest {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public questId!: string;

  @Field(() => questStatus)
  public status!: questStatus;

  @Field(() => questCondition)
  public questCondition!: questCondition;

  @Field(() => questType)
  public questType!: questType;

  @Field(() => questField)
  public questField!: questField;

  @Field(() => Number)
  public progress!: number;

  @Field(() => String)
  public finishResult!: number;

  @Field(() => Date, { nullable: true })
  public completedAt: Date;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date, { nullable: true })
  public updatedAt: Date;

  @Field(() => QuestDto, { nullable: true })
  public questEntity: QuestDto;
}
