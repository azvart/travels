import { QuestRewardOrmEntity } from '@app/entities/enity';
import { QUEST_REWARD_TYPE } from 'libs/interfaces';

export class QuestRewardDto {
  public static fromEntity(questReward?: QuestRewardOrmEntity) {
    return questReward
      ? new QuestRewardDto(
          questReward.id,
          questReward.rewardType,
          questReward.amount,
        )
      : null;
  }

  public constructor(
    private readonly _id: string,
    private readonly _rewardType: QUEST_REWARD_TYPE,
    private readonly _amount: number,
  ) {}

  public get id() {
    return this._id;
  }
  public get rewardType() {
    return this._rewardType;
  }
  public get amount() {
    return this._amount;
  }
}
