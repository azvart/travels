import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AccountOrmEntity } from '@app/entities/enity/account.orm-entity';

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
}
