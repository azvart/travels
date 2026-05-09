import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserAddressInput {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public countryCode?: string;

  @Field(() => String, { nullable: true })
  public street?: string;

  @Field(() => String, { nullable: true })
  public city?: string;
}
