import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Route } from 'libs/interfaces';
import { RoutePointsDto } from './route-points.dto';

@ObjectType()
export class RouteType implements Route {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public routeName!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public country: string;

  @Field(() => Number)
  public distance!: number;

  @Field(() => String)
  public durationLabel!: string;

  @Field(() => Number)
  public pointsCount!: number;

  @Field(() => String)
  public difficulty!: string;

  @Field(() => [RoutePointsDto])
  public points: RoutePointsDto[];
}
