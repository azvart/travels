import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AccountQueriesResolver } from './resolvers/account/account-queries.resolver';
import { AccountMutationResolver } from './resolvers/account/account-mutation.resolver';
import { CacheModule } from '@nestjs/cache-manager';

import { join } from 'node:path';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

import { DecoratorsModule } from '@app/decorators';
import { JwtModule } from '@nestjs/jwt';
import { TravelCardsMutationResolver } from './resolvers/travel-cards/travel-cards-mutation.resolver';
import { AchievementsMutationResolver } from './resolvers/achievements/achievements-mutation.resolver';
import { AchievementsQueryResolver } from './resolvers/achievements/achievements-queries.resolver';
import { Context } from 'graphql-ws';
import { WeatherSubscriptionResolver } from './subscriptions/weather/weather-subscription.resolver';
import { AppConfigModule } from '@app/app-config';
import { UserMutationResolver } from './resolvers/account/user-mutation.resolver';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    DecoratorsModule,
    JwtModule,
    GrpcApiClientsModule,
    CacheModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          // onConnect: (context: Context<any>) => {
          //   const { connectionParams, extra } = context;
          //   extra.user = { user: {} };
          // },
        },
      },
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
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
