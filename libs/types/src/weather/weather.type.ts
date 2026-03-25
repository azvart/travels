import { ObjectType, ID, Field } from '@nestjs/graphql';

@ObjectType()
export class WeatherObjectType {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public city?: string;
}
