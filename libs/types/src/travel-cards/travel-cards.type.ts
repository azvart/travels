import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TravelCards {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public title!: string;

  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => Number, { nullable: true })
  public amount?: number;

  @Field(() => String, { nullable: true })
  public currency?: string;

  @Field(() => String, { nullable: true })
  public image?: string;
}
