import { InputType, Field, ID } from '@nestjs/graphql';
import { IFindOneRoute } from 'libs/interfaces';

@InputType()
export class FindOneRouteDto implements IFindOneRoute {
  @Field(() => ID)
  public id: string;
}
