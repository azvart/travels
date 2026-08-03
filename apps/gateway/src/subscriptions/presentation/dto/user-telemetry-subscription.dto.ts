import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IUserTelemetry } from 'libs/interfaces';




@ObjectType()
export class UserTelemetrySubscriptionDto
  implements IUserTelemetry {

  @Field(() => ID)
  public id!: string;

  @Field(() => Number)
  public steps: number;

  @Field(() => Number)
  public avgPace: number;

  @Field(() => Number)
  public duration: number;

  @Field(() => Number)
  public distance: number;

}
