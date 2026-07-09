import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UpdateUserInput, User, UserFull } from './dto';
import { UserPresentationService } from './user-presentation.service';
import { CurrentUser } from '@app/auth';
import { IGetCurrentUser } from 'libs/interfaces';


@Resolver(() => User)
export class UserPresentationResolver {

  public constructor(
    private readonly userPresentationService: UserPresentationService
  ){}

  @Mutation(() => User)
  public async updateUser(@Args('input') input: UpdateUserInput){
    return this.userPresentationService.updateUser(input)
  }

  @Query(() => UserFull)
  public async getUserFull(@CurrentUser() user:IGetCurrentUser){
    return this.userPresentationService.getUserFull(user.userId)
  }

}
