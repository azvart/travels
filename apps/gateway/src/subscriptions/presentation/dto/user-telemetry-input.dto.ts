import { InputType, Field, ID } from '@nestjs/graphql';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';

@InputType()
export class UserTelemetryInputDto implements Omit<IUpdateUserTelemetry, 'userId'> {
  @Field(() => ID)
  public routeId!: string;

  @Field(() => Number)
  public steps!: number;

  @Field(() => Number)
  public avgPace!: number;

  @Field(() => Number)
  public duration: number;

  @Field(() => Number)
  public distance: number;
}
