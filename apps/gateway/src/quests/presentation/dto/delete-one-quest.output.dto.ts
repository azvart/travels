import { Field, ID, ObjectType, } from '@nestjs/graphql';



@ObjectType()
export class DeleteOneQuestOutputDto {
  @Field(() => ID)
  public id!: string;
}
