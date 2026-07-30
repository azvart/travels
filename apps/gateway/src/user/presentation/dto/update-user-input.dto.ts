import { ID, InputType, Field } from '@nestjs/graphql';
import { IUpdateUserInputInterface } from 'libs/interfaces';

@InputType()
export class UpdateUserInput implements IUpdateUserInputInterface {
  @Field(() => ID)
  public id!: string;

  @Field(() => String, { nullable: true })
  public firstName?: string;

  @Field(() => String, { nullable: true })
  public lastName?: string;

  @Field(() => Number, { nullable: true })
  public age?: number;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  countryCode?: string;

  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => String, { nullable: true })
  city?: string;
}
