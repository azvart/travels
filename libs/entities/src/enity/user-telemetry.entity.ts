import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { UserEntity } from './user.entity';
import { IUserTelemetry } from 'libs/interfaces';


@Entity()
export class UserTelemetryEntity implements IUserTelemetry {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public userId: string;

  @Column({ default: 0 })
  public duration!: number;

  @Column({ default: 0 })
  public steps!: number;

  @Column({ default: 0 })
  public avgPace!: number;

  @Column()
  public routeId!: string;

  @Column({ default: 0 })
  public distance!: number;
}
