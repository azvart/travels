import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IQuest } from 'libs/interfaces';
import { UserQuestEntity } from './user-quest.entity';
import { questType, questCondition, questField } from '@app/proto/generated/quest/quest';

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
    type: 'enum',
    enum: questCondition,
    nullable: false,
  })
  public questCondition!: questCondition;

  @Column({
    type: 'enum',
    enum: questType,
    nullable: false,
    default: questType.DEFAULT,
  })
  public questType!: questType;

  @Column({
    type: 'enum',
    enum: questField,
    nullable: false,
  })
  public questField: questField;

  @Column()
  public questFinishResults: number;

  @Column({
    nullable: false,
  })
  public questCountry: string;

  @OneToMany(() => UserQuestEntity, (uq) => uq.quest)
  public userQuests: UserQuestEntity;

  @BeforeInsert()
  @BeforeUpdate()
  checkConditionWithField() {
    switch (this.questCondition) {
      case questCondition.CREATE: {
        const possibleToCreate = [questField.AWARDS, questField.ROUTES];
        if (!possibleToCreate.includes(this.questField)) {
          throw new Error(`quest field ${this.questField} cannot be set with condition CREATE`);
        }
        break;
      }
    }
  }
}
