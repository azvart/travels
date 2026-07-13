import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IQuest, QUEST_TYPE } from 'libs/interfaces';

@Entity('quest')
export class QuestEntity implements IQuest {

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    nullable: false
  })
  public questName!: string;

  @Column({
    nullable: false
  })
  public questDescription!: string;

  @Column({
    nullable: false
  })
  public questReward!: string;

  @Column({
    nullable: false
  })
  public questCondition!: string;

  @Column({
    nullable: false,
    default: QUEST_TYPE.DEFAULT
  })
  public questType?: QUEST_TYPE;

  @Column({
    nullable: false
  })
  public questCountry: string;

}
