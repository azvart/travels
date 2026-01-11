import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AccountQueriesResolver } from './resolvers/account/account-queries.resolver';
import { AccountMutationResolver } from './resolvers/account/account-mutation.resolver';

import { join } from 'node:path';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

import { DecoratorsModule } from '@app/decorators';
import { JwtModule } from '@nestjs/jwt';
import { TravelCardsMutationResolver } from './resolvers/travel-cards/travel-cards-mutation.resolver';

@Module({
  imports: [
    DecoratorsModule,
    JwtModule,
    GrpcApiClientsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
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
  ],
})
export class GatewayModule {}
