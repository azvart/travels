import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTravelCardInputType {
  @Field(() => ID)
  public id!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String, { nullable: true })
  public title?: string;

  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => String, { nullable: true })
  public amount?: string;

  @Field(() => String, { nullable: true })
  public currency?: string;

  @Field(() => String, { nullable: true })
  public image?: string;

  @Field(() => String, { nullable: true })
  public timezone?: string;

  @Field(() => String, { nullable: true })
  public timezoneOffset?: string;

  @Field(() => String, { nullable: true })
  public startDate?: Date;

  @Field(() => String, { nullable: true })
  public endDate?: Date;
}
