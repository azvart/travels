import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AchievementsGrpcService } from '@app/grpc-api-clients/achievements';
import { firstValueFrom } from 'rxjs';
import {
  Achievement,
  CreateAchievementInput,
  DeleteAchievementInput,
} from '@app/types';

@Resolver(() => Achievement)
export class AchievementsMutationResolver {
  public constructor(
    private readonly achievementGrpcService: AchievementsGrpcService,
  ) {}

  @Mutation(() => Achievement)
  public async createAchievement(@Args('input') input: CreateAchievementInput) {
    return firstValueFrom(
      this.achievementGrpcService.service.createAchievement({
        name: input.name,
        points: input.points,
      }),
    );
  }

  @Mutation(() => Boolean)
  public async deleteAchievement(@Args('input') input: DeleteAchievementInput) {
    return firstValueFrom(
      this.achievementGrpcService.service.deleteAchievement({
        id: input.id,
      }),
    );
  }
}
