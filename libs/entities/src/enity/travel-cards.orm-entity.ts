import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from '@app/entities/enity/user.orm-entity';

@Entity('travel-cards')
export class TravelCardsOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ default: 0 })
  public amount: number;

  @Column({ default: 'USD' })
  public currency: string;

  @Column({ array: true })
  public countries: string;

  @Column()
  public timezone: string;

  @Column()
  public timezoneOffset: string;

  @Column()
  public startDate: Date;

  @Column()
  public endDate: Date;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: UserOrmEntity;
}
