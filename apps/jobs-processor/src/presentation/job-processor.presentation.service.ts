import { Injectable } from '@nestjs/common';
import { UpdateUserTelemetryHandler } from '../use-case/update-user-telemetry/update-user-telemetry.handler';
import {
  CreateAttachedUserQuestInRedisHandler
} from '../use-case/create-attached-user-quest-in-redis/create-attached-user-quest-in-redis.handler';
import { FinishQuestHandler } from '../use-case/finish-quests/finish-quest.handler';

@Injectable()
export class JobProcessorPresentationService {
  public constructor(
    private readonly updateUserTelemetryHandler: UpdateUserTelemetryHandler,
    private readonly createAttachedUserQuestInRedisHandler: CreateAttachedUserQuestInRedisHandler,
    private readonly finishQuestHandler: FinishQuestHandler,
  ) {}

  public async updateUserTelemetry() {
    return this.updateUserTelemetryHandler.run();
  }

  public async createAttachedUserQuestInRedis(){
    return this.createAttachedUserQuestInRedisHandler.run();
  }

  public async finishQuests(){
    return this.finishQuestHandler.run();
  }
}
