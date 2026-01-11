import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateTravelCardInput, TravelCards } from '@app/types';
import { TravelCardsOutputType } from '@app/types';
import { firstValueFrom } from 'rxjs';
import { TravelCardsGrpcService } from '@app/grpc-api-clients/travel-cards/travel-cards-grpc.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/auth-guard';

@Resolver(() => TravelCards)
export class TravelCardsMutationResolver {
  public constructor(
    private readonly travelCardsGrpcService: TravelCardsGrpcService,
  ) {}

  @Mutation(() => TravelCardsOutputType)
  @UseGuards(GqlAuthGuard)
  public async createCard(
    @Args('input') input: CreateTravelCardInput,
    @Context() ctx,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = ctx.user.userId as string;
    return firstValueFrom(
      this.travelCardsGrpcService.service.createNewTravelCards({
        userId,
        title: input.title,
        description: input.description,
        amount: input.amount,
        image: input.image,
        currency: input.currency,
      }),
    );
  }
}
