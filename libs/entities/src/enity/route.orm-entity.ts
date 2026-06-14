import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('route')
export class RouteOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    nullable: false,
  })
  public routeName!: string;
}
