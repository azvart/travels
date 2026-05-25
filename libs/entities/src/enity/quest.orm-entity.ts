import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QUEST_TYPE, QUEST_CONDITION } from 'libs/interfaces';
import { QuestRewardOrmEntity } from '@app/entities/enity/quest-reward.orm-entity';

@Entity('quests')
export class QuestOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public title: string;

  @Column({
    length: 250,
    nullable: true,
  })
  public description?: string;

  @Column({
    nullable: false,

    default: QUEST_TYPE.DEFAULT,
  })
  public type: QUEST_TYPE;

  @Column({
    nullable: false,
  })
  public startDate: Date;

  @Column({
    nullable: true,
  })
  public endDate?: Date;

  @Column({
    nullable: true,
    default: 0,
  })
  public progress: number;

  @Column({
    nullable: false,
    default: QUEST_CONDITION.STEPS,
  })
  condition: QUEST_CONDITION;

  @ManyToOne(() => QuestRewardOrmEntity, (reward) => reward.quests)
  @JoinColumn()
  rewardPackage: QuestRewardOrmEntity;
}
