import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserStatistic } from 'libs/interfaces/user-statistic';

@Entity('user-statistic')
export class UserStatisticEntity implements IUserStatistic {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'float', default: 0 })
  public steps!: number;

  @Column({ type: 'float', default: 0 })
  public createdRoutes!: number;

  @Column({ type: 'float', default: 0 })
  public finishedRoutes!: number;

  @Column({ type: 'float', default: 0 })
  public grantedAwards!: number;

  @Column({ type: 'float', default: 0 })
  public finishedQuests!: number;

  @Column({ type: 'float', default: 0 })
  public attachedQuests!: number;

  @Column({ type: 'json' })
  public countries!: string[];

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn()
  public user: UserEntity;
}
