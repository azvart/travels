import { InputType, Field } from '@nestjs/graphql';
import { ICreateRoute, IRoutePoints } from 'libs/interfaces';
import { RoutePointsDto } from './route-points.dto';
import { CreateRoutePointsDto } from './create-route-points.dto';

@InputType()
export class CreateRouteDto implements Omit<ICreateRoute, 'userId'> {
  @Field(() => String, { nullable: false })
  public routeName!: string;

  @Field(() => String, { nullable: false })
  public country!: string;

  @Field(() => Number)
  public distance!: number;

  @Field(() => String)
  public durationLabel!: string;

  @Field(() => Number)
  public pointsCount!: number;

  @Field(() => String)
  public difficulty!: string;

  @Field(() => [CreateRoutePointsDto])
  public points!: IRoutePoints[]
}
