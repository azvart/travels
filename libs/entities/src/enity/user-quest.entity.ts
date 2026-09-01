import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { QuestEntity } from './quest.entity';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';
import {
  questCondition,
  questField,
  questStatus,
  questType,
} from '@app/proto/generated/quest/quest';

@Entity('user_quest')
@Unique(['questId'])
export class UserQuestEntity implements IUserQuest {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => UserEntity, (user) => user.userQuests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ name: 'user_id' })
  public userId!: string;

  @ManyToOne(() => QuestEntity, (quest) => quest.userQuests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quest_id' })
  public quest!: QuestEntity;

  @Column({ name: 'quest_id' })
  public questId!: string;

  @Column({ type: 'enum', enum: questStatus, default: questStatus.IN_PROGRESS })
  public status!: questStatus;

  @Column({ type: 'float', default: 0 })
  public progress!: number;

  @Column({ type: 'float' })
  public finishResult!: number;

  @Column({type: 'enum', enum: questCondition, nullable: false})
  public questCondition!: questCondition;

  @Column({ type: 'enum', enum: questType, nullable: false })
  public questType!: questType;

  @Column({ type: 'enum', enum: questField, nullable: false })
  public questField!: questField;

  @Column({ type: 'timestamp', nullable: true })
  public completedAt!: Date | null;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt!: Date
}
