import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from '@app/entities/enity/user.orm-entity';

@Entity('user-address')
export class UserAddressOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId!: string;

  @Column({ nullable: true })
  public country?: string;

  @Column({ nullable: true })
  public countryCode?: string;

  @Column({ nullable: true })
  public street?: string;

  @Column({ nullable: true })
  public city?: string;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn()
  public user: UserOrmEntity;
}
