import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { join } from 'node:path';
import { AppConfigModule } from '@app/app-config';
import { PubSubModule } from '@app/pubsub';
import { AuthModule } from '@app/auth';
import { AccountPresentationModule } from './account';
import { UserPresentationModule } from './user';
import { RoutePresentationModule } from './routes';
import { QuestsPresentationModule } from './quests';
import { SubscriptionPresentationModule } from './subscriptions';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    PubSubModule,
    AuthModule,
    CacheModule.register(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          onConnect: (context) => {
            return {
             connectionParams: context.connectionParams
            };
          },
        },
      },
      playground: true,
      introspection: true,
      graphiql: true,
      context: ({ req, res, extra, connectionParams }) => {
        return { req, res, user: extra?.user, connectionParams, extra };
      },
    }),
    AccountPresentationModule,
    UserPresentationModule,
    RoutePresentationModule,
    QuestsPresentationModule,
    SubscriptionPresentationModule
  ],
})
export class GatewayModule {}
