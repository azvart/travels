import { InputType, Field } from '@nestjs/graphql';
import { ICreateRoute } from 'libs/interfaces';

@InputType()
export class CreateRouteDto implements ICreateRoute {
  @Field(() => String, { nullable: false })
  public routeName!: string;
}
