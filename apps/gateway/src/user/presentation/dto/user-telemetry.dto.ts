import { ObjectType, ID, Field } from '@nestjs/graphql';
import { IUserTelemetry } from 'libs/interfaces';
import { User } from './user.dto';

@ObjectType()
export class UserTelemetryDto implements IUserTelemetry {
  @Field(() => ID)
  public id: string;

  @Field(() => User, { nullable: true })
  public user?: User;

  @Field(() => Number)
  public duration: number;

  @Field(() => Number)
  public steps: number;

  @Field(() => Number)
  public avgPace: number;

  @Field(() => String)
  public routeId: string;

  @Field(() => Number)
  public distance: number;
}
