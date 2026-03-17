import { Module } from '@nestjs/common';
import { AchievementsService } from './services/achievements.service';
import { AchievementsGrpcController } from './controllers/achievements.grpc.controller';
import { RedisModule } from '@app/redis';
import { DatabaseModule } from 'libs/database';
import { EntitiesModule } from '@app/entities';
import { AchievementTypeormRepository } from './repositories/achievement.typeorm-repository';
import { AchievementsAbstractRepository } from './abstracts/achievements.abstract.repository';

@Module({
  imports: [RedisModule, DatabaseModule, EntitiesModule],
  controllers: [AchievementsGrpcController],
  providers: [
    AchievementsService,
    {
      provide: AchievementsAbstractRepository,
      useClass: AchievementTypeormRepository,
    },
  ],
})
export class AppModule {}
