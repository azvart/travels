import { Resolver, Subscription } from '@nestjs/graphql';
import { pubSub } from '@app/pubsub';
import { WeatherObjectType } from '@app/types/weather';

@Resolver(() => WeatherObjectType)
export class WeatherSubscriptionResolver {
  @Subscription(() => WeatherObjectType)
  weatherSubscription() {
    return pubSub.asyncIterableIterator('weatherSubscription');
  }
}
