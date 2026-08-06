import { Module } from '@nestjs/common';
import { AwardsRepositoryModule } from '../../infrastructure/awards/awards.repository.module';
import { FindOneAwardHandler } from './find-one-award.handler';

@Module({
  imports: [AwardsRepositoryModule],
  providers: [FindOneAwardHandler],
  exports: [FindOneAwardHandler],
})
export class FindOneAwardModule {}
