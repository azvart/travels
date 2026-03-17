import { Args, Query, Resolver } from '@nestjs/graphql';
import { AchievementsGrpcService } from '@app/grpc-api-clients/achievements';
import { firstValueFrom } from 'rxjs';
import { Achievement } from '@app/types';

@Resolver(() => Achievement)
export class AchievementsQueryResolver {
  public constructor(
    private readonly achievementsGrpcService: AchievementsGrpcService,
  ) {}

  @Query(() => [Achievement])
  public async getAllAchievements() {
    return firstValueFrom(
      this.achievementsGrpcService.service.getAchievements({}),
    );
  }

  @Query(() => Achievement)
  public async getAchievement(@Args('id') id: string) {
    return firstValueFrom(
      this.achievementsGrpcService.service.getAchievement({
        id,
      }),
    );
  }
}
