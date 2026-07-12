import { InputType, Field } from '@nestjs/graphql';
import { ICreateRoute } from 'libs/interfaces';

@InputType()
export class CreateRouteDto implements Omit<ICreateRoute, 'userId'> {
  @Field(() => String, { nullable: false })
  public routeName!: string;
}
