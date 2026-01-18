import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { TravelCards, TravelCardsOutputType } from '@app/types';
import { TravelCardsGrpcService } from '@app/grpc-api-clients';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/auth-guard';
import { firstValueFrom } from 'rxjs';

@Resolver(() => TravelCards)
export class TravelCardsQueryResolver {
  public constructor(
    private readonly travelCardsGrpcService: TravelCardsGrpcService,
  ) {}

  @Query(() => TravelCardsOutputType)
  @UseGuards(GqlAuthGuard)
  public async getOne(@Args('id') id: string, @Context() ctx) {
    return firstValueFrom(
      this.travelCardsGrpcService.service.getCardById({
        id,
      }),
    );
  }

  @Query(() => [TravelCardsOutputType])
  @UseGuards(GqlAuthGuard)
  public async getMany(@Context() ctx) {
    return firstValueFrom(this.travelCardsGrpcService.service.getCards({}));
  }
}
