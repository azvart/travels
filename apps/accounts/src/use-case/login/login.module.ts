import { Module } from '@nestjs/common';
import { LoginHandler } from './login.handler';
import { AccountRepositoryModule } from '../../infrastructure/account';
import { UserRepositoryModule } from '../../infrastructure/user';
import { GenerateTokenPairModule } from '../generate-token-pair/generate-token-pair.module';


@Module({
  imports: [
    AccountRepositoryModule,
    UserRepositoryModule,
    GenerateTokenPairModule
  ],
  providers: [LoginHandler],
  exports: [LoginHandler]
})
export class LoginModule {}
