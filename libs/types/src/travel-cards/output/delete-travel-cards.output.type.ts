import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTravelCardsOutputType {
  @Field(() => Boolean)
  public success!: boolean;
}
