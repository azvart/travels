import { InputType, Field } from '@nestjs/graphql';
import { IFindManyRoutes } from 'libs/interfaces';

@InputType()
export class FindManyRoutesDto implements IFindManyRoutes {
  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => Boolean, { defaultValue: true })
  public externalRoutes: boolean;
}
