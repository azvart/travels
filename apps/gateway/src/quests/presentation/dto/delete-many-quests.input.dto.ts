import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteManyQuestsInputDto {
  @Field(() => [ID])
  public id!: string[];
}
