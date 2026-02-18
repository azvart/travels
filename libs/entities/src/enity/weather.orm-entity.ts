import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { AccountOrmEntity } from '@app/entities/enity/account.orm-entity';

@Entity()
export class WeatherOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public country?: string;

  @Column({ nullable: true })
  public city?: string;

  @Column()
  public accountId!: string;

  @OneToOne(() => AccountOrmEntity)
  @JoinColumn()
  public account: AccountOrmEntity;
}
