import { Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class QuestMutationResolver {
  @Mutation()
  public async createQuest() {}
}
