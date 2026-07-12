import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateRouteDto, RouteType, UpdateRoute } from './dto';
import { RoutePresentationService } from './route-presentation.service';
import { CurrentUser } from '@app/auth';
import { IGetCurrentUser } from 'libs/interfaces';

@Resolver(() => RouteType)
export class RoutePresentationResolver {

  public constructor(
    private readonly routePresentationService: RoutePresentationService
  ){}

  @Mutation(() => RouteType)
  public async createRoute(@Args('input') input: CreateRouteDto, @CurrentUser() user: IGetCurrentUser) {
    return this.routePresentationService.createRoute({...input, userId: user.userId});
  }

  @Mutation(() => RouteType)
  public async updateRoute(
    @Args('input') input: UpdateRoute,
    @CurrentUser() user: IGetCurrentUser){
    return this.routePresentationService.updateRoute({...input , userId: user.userId});
  }
}
