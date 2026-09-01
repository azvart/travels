import { InputType, Field } from '@nestjs/graphql';
import { ICreateAward } from 'libs/interfaces/awards';

@InputType()
export class CreateAwardInputDto implements ICreateAward {
  @Field(() => String)
  public name!: string;

  @Field(() => String)
  public description!: string;

  @Field(() => String, { nullable: true })
  public imageUrl!: string;
}
