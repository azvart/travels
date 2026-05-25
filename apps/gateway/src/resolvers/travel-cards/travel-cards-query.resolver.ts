import { Resolver, Query, Args } from '@nestjs/graphql';
import { TravelCards, TravelCardsOutputType } from '@app/types';
import { TravelCardsGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '@app/auth';
import { UserPayload } from '@app/types/shared';

@Resolver(() => TravelCards)
export class TravelCardsQueryResolver {
  public constructor(
    private readonly travelCardsGrpcService: TravelCardsGrpcService,
  ) {}

  @Query(() => TravelCardsOutputType)
  public async getOne(@Args('id') id: string, @CurrentUser() user: UserPayload) {
    return firstValueFrom(
      this.travelCardsGrpcService.service.getCardById({
        id,
      }),
    );
  }

  @Query(() => [TravelCardsOutputType])
  public async getMany(@CurrentUser() user:UserPayload) {
    return firstValueFrom(this.travelCardsGrpcService.service.getCards({}));
  }
}
