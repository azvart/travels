import { Module } from '@nestjs/common';
import { PubSubModule } from '@app/pubsub';
import { SubscriptionPresentationController } from './subscription.presentation.controller';
import { SubscriptionPresentationService } from './subscription.presentation.service';
import { UserQuestUpdateModule } from '../use-case/user-quest-update/user-quest-update.module';


@Module({
  imports: [PubSubModule, UserQuestUpdateModule],
  providers: [SubscriptionPresentationController, SubscriptionPresentationService]
})
export class SubscriptionPresentationModule {}
