import { Module } from '@nestjs/common';
import { AccountAbstractRepository } from '../abstracts/account.abstract.repository';
import { AccountTypeormRepository } from '../repositories/account.typeorm-repository';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from '../services/account.service';
import { EntitiesModule } from '@app/entities';
import { AccountGrpcController } from '../controllers/account.grpc.controller';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { UserService } from '../services/user.service';
import { UserAbstractRepository } from '../abstracts/user.abstract.repository';
import { UserTypeormRepository } from '../repositories/user.typeorm-repository';
import { UserGrpcController } from '../controllers/user.grpc.controller';

@Module({
  imports: [EntitiesModule, JwtModule, GrpcApiClientsModule],
  controllers: [AccountGrpcController, UserGrpcController],
  providers: [
    AccountService,
    UserService,
    {
      provide: AccountAbstractRepository,
      useClass: AccountTypeormRepository,
    },
    {
      provide: UserAbstractRepository,
      useClass: UserTypeormRepository,
    },
  ],
})
export class AccountModule {}
