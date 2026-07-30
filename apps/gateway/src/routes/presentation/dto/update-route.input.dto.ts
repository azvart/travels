import { InputType, Field, ID } from '@nestjs/graphql';
import { IUpdateRoute } from 'libs/interfaces';


@InputType()
export class UpdateRoute implements Omit<IUpdateRoute, 'userId'> {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public routeName!: string;

  @Field(() => String, { nullable: true })
  public country!: string;

  @Field(() => Number, { nullable: true })
  public distance!: number;

  @Field(() => String, { nullable: true })
  public durationLabel!: string;

  @Field(() => Number, { nullable: true })
  public pointsCount!: number;

  @Field(() => String, { nullable: true })
  public difficulty!: string;

  @Field(() => String, { nullable: true })
  public coverImageUrl?: string;
}
