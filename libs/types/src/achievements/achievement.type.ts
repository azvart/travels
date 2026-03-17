import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Achievement {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;

  @Field(() => Number)
  public points!: number;
}
