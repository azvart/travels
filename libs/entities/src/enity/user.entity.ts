import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { AccountEntity } from '@app/entities/enity/account.entity';
import { IUser } from 'libs/interfaces';
import { UserQuestEntity } from './user-quest.entity';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public firstName?: string;

  @Column({ nullable: true })
  public lastName?: string;

  @Column({ nullable: true })
  public age?: number;

  @Column({ nullable: true })
  public country?: string;

  @Column({ nullable: true })
  public countryCode?: string;

  @Column({ nullable: true })
  public street?: string;

  @Column({ nullable: true })
  public city?: string;

  @OneToOne(() => AccountEntity, { nullable: true })
  @JoinColumn()
  public account?: AccountEntity;

  @OneToMany(() => UserQuestEntity, (uq) => uq.quest)
  public userQuests: UserQuestEntity[];
}
