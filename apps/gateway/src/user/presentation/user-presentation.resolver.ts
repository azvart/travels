import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UpdateUserInput, User, UserFull, UserGamificationDto, UserTelemetryDto } from './dto';
import { UserPresentationService } from './user-presentation.service';
import { CurrentUser } from '@app/auth';
import { IGetUser } from 'libs/interfaces';


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
  public async getUserFull(@CurrentUser() user:IGetUser){
    return this.userPresentationService.getUserFull(user)
  }

  @Query(() => UserTelemetryDto)
  public async getUserTelemetry(@CurrentUser() user:IGetUser, @Args('routeId') routeId: string){
    return this.userPresentationService.getUserTelemetry(user, routeId)
  }

  @Query(() => UserGamificationDto)
  public async getUserGamification(@CurrentUser() user:IGetUser){
    return this.userPresentationService.getUserGamification(user)
  }

}
