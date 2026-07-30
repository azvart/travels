import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountAbstractRepository } from './account.abstract.repository';
import { AccountRepository } from './account.repository';
import { AccountEntity } from '@app/entities/enity';


@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [
    {
      provide: AccountAbstractRepository,
      useClass: AccountRepository,
    },
  ],
  exports: [
    {
      provide: AccountAbstractRepository,
      useClass: AccountRepository,
    },
  ],
})
export class AccountRepositoryModule {}
