import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { QuestEntity } from './quest.entity';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';

@Entity('user_quest')
@Unique(['userId', 'questId'])
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

  @Column({ type: 'enum', enum: QuestStatusEnum, default: QuestStatusEnum.IN_PROGRESS })
  public status!: QuestStatusEnum;

  @Column({ type: 'float', default: 0 })
  public progress!: number;

  @Column({ type: 'float', default: 100 })
  public finishResult!: number;

  @Column({ type: 'timestamp', nullable: true })
  public completedAt!: Date | null;

  @CreateDateColumn()
  public createdAt!: Date;
}
