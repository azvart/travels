import { Module } from '@nestjs/common';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountTypeormRepository } from './infrastructure/persistense/account.typeorm-repository';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from './application/account.service';
import { EntitiesModule } from '@app/entities';
import { AccountGrpcController } from './interfaces/grpc/account.grpc.controller';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { UserService } from './application/user.service';
import { UserRepository } from './domain/repositories/user.repository';
import { UserTypeormRepository } from './infrastructure/persistense/user.typeorm-repository';

@Module({
  imports: [EntitiesModule, JwtModule, GrpcApiClientsModule],
  controllers: [AccountGrpcController],
  providers: [
    AccountService,
    UserService,
    {
      provide: AccountRepository,
      useClass: AccountTypeormRepository,
    },
    {
      provide: UserRepository,
      useClass: UserTypeormRepository,
    },
  ],
})
export class AccountModule {}
