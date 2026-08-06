import { Module } from '@nestjs/common';
import { AwardsRepositoryModule } from '../../infrastructure/awards/awards.repository.module';
import { UpdateAwardHandler } from './update-award.handler';

@Module({
  imports: [AwardsRepositoryModule],
  providers: [UpdateAwardHandler],
  exports: [UpdateAwardHandler],
})
export class UpdateAwardModule {}
