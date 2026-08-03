import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserGamification } from 'libs/interfaces';

@Entity()
export class UserGamificationEntity implements IUserGamification {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  public user?: UserEntity;

  @Column({ default: 1 })
  public userLevel!: number;

  @Column({ default: 0 })
  public userLevelProgress!: number;
}
