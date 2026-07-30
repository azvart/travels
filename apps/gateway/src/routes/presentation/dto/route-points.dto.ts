import { ObjectType, Field, } from '@nestjs/graphql';
import { IRoutePoints } from 'libs/interfaces';


@ObjectType()
export class RoutePointsDto implements IRoutePoints{

  @Field(() => String)
  public id!: string;

  @Field(() => Number)
  public latitude!:number;

  @Field(() => Number)
  public longitude!: number;

  @Field(() => Number)
  public order!: number;

  @Field(() => String, {nullable: true})
  public title?: string;

}
