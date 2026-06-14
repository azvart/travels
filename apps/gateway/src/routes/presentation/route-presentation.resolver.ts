import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateRouteDto, RouteType } from './dto';
import { RoutePresentationService } from './route-presentation.service';

@Resolver(() => RouteType)
export class RoutePresentationResolver {

  public constructor(
    private readonly routePresentationService: RoutePresentationService
  ){}

  @Mutation(() => RouteType)
  public async createRoute(@Args('input') input: CreateRouteDto) {
    return this.routePresentationService.createRoute(input);
  }
}
