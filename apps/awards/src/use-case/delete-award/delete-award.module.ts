import { Module } from '@nestjs/common';
import { AwardsRepositoryModule } from '../../infrastructure/awards/awards.repository.module';
import { DeleteAwardHandler } from './delete-award.handler';

@Module({
  imports: [AwardsRepositoryModule],
  providers: [DeleteAwardHandler],
  exports: [DeleteAwardHandler],
})
export class DeleteAwardModule {}
