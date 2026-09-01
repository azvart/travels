import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { IUpdateUserTelemetry } from 'libs/interfaces';
import { UserTelemetrySubscriptionHandler } from '../use-case/user-telemetry-subscription/user-telemetry-subscription.handler';

@Injectable()
export class SubscriptionPresentationService {
  public constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    private readonly userTelemetrySubscriptionHandler: UserTelemetrySubscriptionHandler,
  ) {}

  public questSubscription(userId: string) {
    return this.pubSub.asyncIterableIterator(`user-quest-sub-${userId}`);
  }

  public async userTelemetrySubscription(
    userId: string,
    data: Omit<IUpdateUserTelemetry, 'userId'>,
  ) {
    await this.userTelemetrySubscriptionHandler.run(userId, data);
    return this.pubSub.asyncIterableIterator(`user-telemetry-sub-${userId}-${data.routeId}`);
  }
}
