import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('achievements')
export class AchievementsEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public points: number;
}
