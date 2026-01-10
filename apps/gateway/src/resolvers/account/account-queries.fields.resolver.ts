import { Resolver } from '@nestjs/graphql';
import { Account } from '@app/types';

@Resolver(() => Account)
export class AccountQueriesFieldsResolvers {}
