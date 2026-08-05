import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { AwardsEntity } from './awards.entity';
import { IUserAwards } from 'libs/interfaces/user-awards';

@Entity('user-awards')
@Unique(['awardsId', 'userId'])
export class UserAwardsEntity implements IUserAwards {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public userId: string;

  @Column()
  public awardsId!: string;

  @ManyToOne(() => AwardsEntity, (awards) => awards.userAwards)
  @JoinColumn({ name: 'awardsId' })
  public awards!: AwardsEntity;

  @Column({ type: 'timestamp', nullable: true })
  public grantedAt!: Date | null;
}
