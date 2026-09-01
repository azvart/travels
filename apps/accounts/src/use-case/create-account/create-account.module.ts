import { Module } from '@nestjs/common';
import { CreateAccountHandler } from './create-account.handler';
import { AccountRepositoryModule } from '../../infrastructure/account';
import { UserRepositoryModule } from '../../infrastructure/user';
import { GenerateTokenPairModule } from '../generate-token-pair/generate-token-pair.module';
import { UserStatisticRepositoryModule } from '../../infrastructure/user-statistic';

@Module({
  imports: [
    AccountRepositoryModule,
    UserRepositoryModule,
    GenerateTokenPairModule,
    UserStatisticRepositoryModule,
  ],
  providers: [CreateAccountHandler],
  exports: [CreateAccountHandler],
})
export class CreateAccountModule {}
