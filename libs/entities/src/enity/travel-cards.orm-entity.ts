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
  public description?: string;

  @Column({ nullable: true })
  public image?: string;

  @Column({ nullable: true })
  public amount?: string;

  @Column({ default: 'USD' })
  public currency: string;

  @Column({ nullable: true })
  public timezone?: string;

  @Column({ nullable: true })
  public timezoneOffset?: string;

  @Column({ nullable: true })
  public startDate?: Date;

  @Column({ nullable: true })
  public endDate?: Date;

  @Column({ default: false })
  public isActive: boolean;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: UserOrmEntity;
}
