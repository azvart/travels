import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteManyQuestsOutputDto {
  @Field(() => [ID])
  public id!: string[];
}
