import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AccountOrmEntity } from '@app/entities/enity/account.orm-entity';
import { AchievementsEntity } from '@app/entities/enity/achievements.orm-entity';
import { QuestOrmEntity } from '@app/entities/enity/quest.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public accountId!: string;

  @Column({ nullable: true })
  public firstName?: string;

  @Column({ nullable: true })
  public lastName?: string;

  @Column({ nullable: true })
  public age?: number;

  @OneToOne(() => AccountOrmEntity)
  @JoinColumn()
  public account: AccountOrmEntity;

  @ManyToMany(() => AchievementsEntity, { nullable: true })
  @JoinTable()
  public achievements?: AchievementsEntity[];

  @ManyToMany(() => QuestOrmEntity, { nullable: true })
  @JoinTable()
  public quests?: QuestOrmEntity[];
}
