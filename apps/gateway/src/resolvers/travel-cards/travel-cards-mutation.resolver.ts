import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import {
  CreateTravelCardInput,
  DeleteTravelCardsOutputType,
  TravelCards,
  UpdateTravelCardInputType,
} from '@app/types';
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

  @Mutation(() => TravelCardsOutputType)
  @UseGuards(GqlAuthGuard)
  public async updateCard(
    @Args('input') input: UpdateTravelCardInputType,
    @Context() ctx,
  ) {
    const userId = ctx.user.userId as string;

    return firstValueFrom(
      this.travelCardsGrpcService.service.updateExistTravelCard({
        id: input.id,
        userId,
        title: input.title,
        description: input.description,
        amount: input.amount,
        image: input.image,
        currency: input.currency,
      }),
    );
  }

  @Mutation(() => DeleteTravelCardsOutputType)
  @UseGuards(GqlAuthGuard)
  public async deleteCard(@Args('id') id: string, @Context() ctx) {
    const userId = ctx.user.userId as string;

    return firstValueFrom(
      this.travelCardsGrpcService.service.deleteExistTravelCard({
        id,
        userId,
      }),
    );
  }
}
