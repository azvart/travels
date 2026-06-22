import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UpdateUserInput, User } from './dto';
import { UserPresentationService } from './user-presentation.service';

@Resolver(() => User)
export class UserPresentationResolver {

  public constructor(
    private readonly userPresentationService: UserPresentationService
  ){}

  @Mutation(() => User)
  public async updateUser(@Args('input') input: UpdateUserInput){
    return this.userPresentationService.updateUser(input)
  }

}
