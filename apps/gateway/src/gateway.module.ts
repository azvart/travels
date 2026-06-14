import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AccountQueriesResolver } from './resolvers/account/account-queries.resolver';
import { AccountMutationResolver } from './resolvers/account/account-mutation.resolver';
import { CacheModule } from '@nestjs/cache-manager';

import { join } from 'node:path';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

import { DecoratorsModule } from '@app/decorators';
import { TravelCardsMutationResolver } from './resolvers/travel-cards/travel-cards-mutation.resolver';
import { AchievementsMutationResolver } from './resolvers/achievements/achievements-mutation.resolver';
import { AchievementsQueryResolver } from './resolvers/achievements/achievements-queries.resolver';
import { WeatherSubscriptionResolver } from './subscriptions/weather/weather-subscription.resolver';
import { AppConfigModule } from '@app/app-config';
import { UserMutationResolver } from './resolvers/account/user-mutation.resolver';
import { PubSubModule } from '@app/pubsub';
import { AuthModule } from '@app/auth';
import { RoutePresentationModule } from './routes/presentation/route-presentation.module';
import { QuestsPresentationModule } from './quests/presentation/quests-presentation.module';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    DecoratorsModule,
    AuthModule,
    GrpcApiClientsModule,
    PubSubModule,
    CacheModule.register(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context) => {
           return { connectionParams: context.connectionParams };
          },
        },
      },
      playground: true,
      context: ({ req, res, extra }) => {
        return { req, res, user: extra?.user };
      },
    }),
    RoutePresentationModule,
    QuestsPresentationModule
  ],
  providers: [
    AccountQueriesResolver,
    AccountMutationResolver,
    TravelCardsMutationResolver,
    AchievementsMutationResolver,
    AchievementsQueryResolver,
    WeatherSubscriptionResolver,
    UserMutationResolver,
  ],
})
export class GatewayModule {}
