import { Resolver, Subscription } from '@nestjs/graphql';
import { WeatherObjectType } from '@app/types/weather';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionsAuthGuard } from '../../guards/auth-guard/subscriptions-auth.guard';

@Resolver(() => WeatherObjectType)
export class WeatherSubscriptionResolver {
  public constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  @Subscription(() => WeatherObjectType)
  @UseGuards(SubscriptionsAuthGuard)
  weatherSubscription() {
    return this.pubSub.asyncIterableIterator('weatherSubscription');
  }
}
