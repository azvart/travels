import { Resolver, Subscription } from '@nestjs/graphql';
import { WeatherObjectType } from '@app/types/weather';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '@app/auth';
import { UserPayload } from '@app/types/shared';

@Resolver(() => WeatherObjectType)
export class WeatherSubscriptionResolver {
  public constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  @Subscription(() => WeatherObjectType)
  weatherSubscription(
    @CurrentUser() user: UserPayload
  ) {
    return this.pubSub.asyncIterableIterator('weatherSubscription');
  }
}
