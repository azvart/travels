import { InputType, Field, ID } from '@nestjs/graphql';
import { IDeleteUserRoute } from 'libs/interfaces';

@InputType()
export class DeleteUserRouteDto implements IDeleteUserRoute {
  @Field(() => ID)
  public id: string;
}
