import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IDeleteUserRouteOuput } from 'libs/interfaces';


@ObjectType()
export class DeleteUserRouteOutputDto implements IDeleteUserRouteOuput{

  @Field(() => ID)
  public id!: string;
}
