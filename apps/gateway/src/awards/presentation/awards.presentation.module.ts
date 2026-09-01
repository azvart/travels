import { Module } from '@nestjs/common';
import { CreateAwardModule } from '../use-case/create-award/create-award.module';
import { AwardsPresentationService } from './awards.presentation.service';
import { AwardsPresentationResolver } from './awards.presentation.resolver';

@Module({
  imports: [CreateAwardModule],
  providers: [AwardsPresentationService, AwardsPresentationResolver],
})
export class AwardsPresentationModule {}
