import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  CreateTravelCardInput,
  DeleteTravelCardsOutputType,
  TravelCards,
  UpdateTravelCardInputType,
} from '@app/types';
import { TravelCardsOutputType } from '@app/types';
import { firstValueFrom } from 'rxjs';
import { TravelCardsGrpcService } from '@app/grpc-api-clients/travel-cards/travel-cards-grpc.service';
import { CurrentUser } from '@app/auth';
import { UserPayload } from '@app/types/shared';

@Resolver(() => TravelCards)
export class TravelCardsMutationResolver {
  public constructor(
    private readonly travelCardsGrpcService: TravelCardsGrpcService,
  ) {}

  @Mutation(() => TravelCardsOutputType)
  public async createCard(
    @Args('input') input: CreateTravelCardInput,
   @CurrentUser() user: UserPayload,
  ) {
    return firstValueFrom(
      this.travelCardsGrpcService.service.createNewTravelCards({
        userId: user.userId,
        title: input.title,
        description: input.description,
        amount: input.amount,
        image: input.image,
        currency: input.currency,
      }),
    );
  }

  @Mutation(() => TravelCardsOutputType)
  public async updateCard(
    @Args('input') input: UpdateTravelCardInputType,
    @CurrentUser() user:UserPayload,
  ) {

    return firstValueFrom(
      this.travelCardsGrpcService.service.updateExistTravelCard({
        id: input.id,
        userId: user.userId,
        title: input.title,
        description: input.description,
        amount: input.amount,
        image: input.image,
        currency: input.currency,
      }),
    );
  }

  @Mutation(() => DeleteTravelCardsOutputType)
  public async deleteCard(@Args('id') id: string, @CurrentUser() user:UserPayload) {

    return firstValueFrom(
      this.travelCardsGrpcService.service.deleteExistTravelCard({
        id,
        userId: user.userId,
      }),
    );
  }
}
