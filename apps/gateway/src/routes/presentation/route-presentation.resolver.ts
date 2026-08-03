import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  CreateRouteDto,
  DeleteUserRouteDto,
  DeleteUserRouteOutputDto,
  FindManyRoutesDto,
  FindOneRouteDto,
  RouteType,
  UpdateRoute,
} from './dto';
import { RoutePresentationService } from './route-presentation.service';
import { CurrentUser } from '@app/auth';
import { IGetUser } from 'libs/interfaces';

@Resolver(() => RouteType)
export class RoutePresentationResolver {
  public constructor(private readonly routePresentationService: RoutePresentationService) {}

  @Mutation(() => RouteType)
  public async createRoute(@Args('input') input: CreateRouteDto, @CurrentUser() user: IGetUser) {
    return this.routePresentationService.createRoute({ ...input, userId: user.userId });
  }

  @Mutation(() => RouteType)
  public async updateRoute(@Args('input') input: UpdateRoute, @CurrentUser() user: IGetUser) {
    return this.routePresentationService.updateRoute({ ...input, userId: user.userId });
  }

  @Query(() => [RouteType])
  public async findManyRoutes(
    @Args('input') input: FindManyRoutesDto,
    @CurrentUser() user: IGetUser,
  ) {
    return this.routePresentationService.findManyRoutes(input, user);
  }

  @Query(() => RouteType)
  public async findOneRoute(@Args('input') input: FindOneRouteDto) {
    return this.routePresentationService.findOneRoute(input);
  }

  @Mutation(() => DeleteUserRouteOutputDto)
  public async deleteUserRoute(
    @Args('input') input: DeleteUserRouteDto,
    @CurrentUser() user: IGetUser,
  ) {
    return this.routePresentationService.deleteUserRoute(input, user);
  }
}
