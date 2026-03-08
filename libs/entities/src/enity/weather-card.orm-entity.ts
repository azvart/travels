import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TravelCardsOrmEntity } from '@app/entities/enity/travel-cards.orm-entity';

@Entity()
export class WeatherCardOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public country?: string;

  @Column({ nullable: true })
  public city?: string;

  @Column()
  public travelCardId!: string;

  @OneToOne(() => TravelCardsOrmEntity)
  @JoinColumn()
  public travelCard: TravelCardsOrmEntity;
}
