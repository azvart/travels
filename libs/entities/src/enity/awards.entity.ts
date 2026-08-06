import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserAwardsEntity } from './user-awards.entity';
import { IAwards } from 'libs/interfaces/awards';

@Entity('awards')
export class AwardsEntity implements IAwards {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    unique: true,
  })
  public name!: string;

  @Column()
  public description!: string;

  @Column({
    nullable: true,
  })
  public imageUrl!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt!: Date | null;

  @OneToMany(() => UserAwardsEntity, (ua) => ua.awards)
  public userAwards: UserAwardsEntity;
}
