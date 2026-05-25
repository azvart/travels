import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { QUEST_REWARD_TYPE } from 'libs/interfaces';
import { QuestOrmEntity } from '@app/entities/enity/quest.orm-entity';

@Entity('quest-reward')
export class QuestRewardOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    nullable: false,
    default: QUEST_REWARD_TYPE.DEFAULT,
  })
  public rewardType: QUEST_REWARD_TYPE;

  @Column({
    nullable: false,
  })
  public amount: number;

  @OneToMany(() => QuestOrmEntity, (reward) => reward.rewardPackage)
  @JoinColumn()
  public quests: QuestOrmEntity[];
}
