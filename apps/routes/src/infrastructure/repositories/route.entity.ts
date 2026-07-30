import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IRoutePoints } from 'libs/interfaces';

@Entity('routes')
export class RouteOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    nullable: false,
  })
  public routeName!: string;

  @Column()
  public userId!: string;

  @Column()
  public country!: string;

  @Column({type: 'double'})
  public distance!: number;

  @Column()
  public durationLabel!: string;

  @Column()
  public pointsCount!: number;

  @Column()
  public difficulty!: string;

  @Column({ type: 'json' })
  public points!: IRoutePoints[]
}
