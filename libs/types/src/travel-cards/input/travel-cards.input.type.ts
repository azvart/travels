import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTravelCardInput {
  @Field(() => String)
  public title!: string;

  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => String, { nullable: true })
  public image?: string;

  @Field(() => String, { nullable: true })
  public amount?: string;

  @Field(() => String, { nullable: true })
  public currency?: string;
}
