import { Module } from '@nestjs/common';
import { AwardsRepositoryModule } from '../../infrastructure/awards/awards.repository.module';
import { CreateAwardHandler } from './create-award.handler';

@Module({
  imports: [AwardsRepositoryModule],
  providers: [CreateAwardHandler],
  exports: [CreateAwardHandler],
})
export class CreateAwardModule {}
