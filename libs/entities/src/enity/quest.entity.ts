import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IQuest, QUEST_TYPE } from 'libs/interfaces';
import { UserQuestEntity } from './user-quest.entity';

@Entity('quest')
export class QuestEntity implements IQuest {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    nullable: false,
  })
  public questName!: string;

  @Column({
    nullable: false,
  })
  public questDescription!: string;

  @Column({
    nullable: false,
  })
  public questReward!: string;

  @Column({
    nullable: false,
  })
  public questCondition!: string;

  @Column({
    type: 'enum',
    enum: QUEST_TYPE,
    nullable: false,
    default: QUEST_TYPE.DEFAULT,
  })
  public questType?: QUEST_TYPE;

  @Column({
    nullable: false,
  })
  public questCountry: string;

  @OneToMany(() => UserQuestEntity, (uq) => uq.quest)
  public userQuests: UserQuestEntity;
}
