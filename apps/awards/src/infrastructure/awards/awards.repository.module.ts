import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsEntity, UserAwardsEntity } from '@app/entities';
import { AwardsAbstractRepository } from './awards.abstract.repository';
import { AwardsRepository } from './awards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AwardsEntity, UserAwardsEntity])],
  providers: [
    {
      provide: AwardsAbstractRepository,
      useClass: AwardsRepository,
    },
  ],
  exports: [
    {
      provide: AwardsAbstractRepository,
      useClass: AwardsRepository,
    },
  ],
})
export class AwardsRepositoryModule {}
