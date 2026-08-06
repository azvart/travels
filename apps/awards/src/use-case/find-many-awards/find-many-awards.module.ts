import { Module } from '@nestjs/common';
import { AwardsRepositoryModule } from '../../infrastructure/awards/awards.repository.module';
import { FindManyAwardsHandler } from './find-many-awards.handler';

@Module({
  imports: [AwardsRepositoryModule],
  providers: [FindManyAwardsHandler],
  exports: [FindManyAwardsHandler],
})
export class FindManyAwardsModule {}
