import { InputType, Field } from '@nestjs/graphql';
import { IRoutePoints } from 'libs/interfaces';

@InputType()
export class CreateRoutePointsDto implements IRoutePoints {
  @Field(() => String)
  public id!: string;
  @Field(() => Number)
  public latitude!: number;
  @Field(() => Number)
  public longitude!: number;
  @Field(() => Number)
  public order!: number;
  @Field(() => String, { nullable: true })
  public title?: string;
}
