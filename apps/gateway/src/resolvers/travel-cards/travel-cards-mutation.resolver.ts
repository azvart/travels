import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';

@Resolver(() => {})
export class TravelCardsMutationResolver {
  @Mutation(() => {})
  public async createCard(@Args('input') input) {
    // return firstValueFrom();
  }

  @Mutation(() => {})
  public async deleteCard(@Args('input') input) {
    // return firstValueFrom();
  }

  @Mutation(() => {})
  public async updateCard(@Args('input') input) {}
}
