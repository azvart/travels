import { InputType, Field, ID } from '@nestjs/graphql';
import { IUpdateRoute } from 'libs/interfaces';


@InputType()
export class UpdateRoute implements Omit<IUpdateRoute, 'userId'> {

  @Field(() => ID)
  public id!: string;


  @Field(() => String)
  public routeName!: string;
}
