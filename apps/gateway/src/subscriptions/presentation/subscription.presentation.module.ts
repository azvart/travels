import { Module } from '@nestjs/common';
import { PubSubModule } from '@app/pubsub';
import { SubscriptionPresentationController } from './subscription.presentation.controller';
import { SubscriptionPresentationService } from './subscription.presentation.service';
import { UserQuestUpdateModule } from '../use-case/user-quest-update/user-quest-update.module';
import {
  UserTelemetrySubscriptionModule
} from '../use-case/user-telemetry-subscription/user-telemetry-subscription.module';


@Module({
  imports: [PubSubModule, UserQuestUpdateModule, UserTelemetrySubscriptionModule],
  providers: [SubscriptionPresentationController, SubscriptionPresentationService]
})
export class SubscriptionPresentationModule {}
