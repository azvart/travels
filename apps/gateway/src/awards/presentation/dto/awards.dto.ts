import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IAwards } from 'libs/interfaces/awards';

@ObjectType()
export class AwardsDto implements IAwards {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public description!: string;

  @Field(() => String, { nullable: true })
  public imageUrl!: string;

  @Field(() => Date, { nullable: true })
  public createdAt: Date;

  @Field(() => Date, { nullable: true })
  public updatedAt: Date;
}
