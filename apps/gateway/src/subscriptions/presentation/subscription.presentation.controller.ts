import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { SubscriptionPresentationService } from './subscription.presentation.service';
import { QuestSubscriptionDto, UserTelemetryInputDto, UserTelemetrySubscriptionDto } from './dto';
import { Logger } from '@nestjs/common';
import { CurrentUser } from '@app/auth';
import { IGetUser } from 'libs/interfaces';


@Resolver()
export class SubscriptionPresentationController {

  private readonly logger:Logger = new Logger(SubscriptionPresentationController.name);

  public constructor(
    private readonly subscriptionPresentationService: SubscriptionPresentationService
  ){}



  @Subscription(() => QuestSubscriptionDto)
  public async questSubscription(@CurrentUser() user: IGetUser){
    this.logger.debug('Incoming args', user);
    return this.subscriptionPresentationService.questSubscription(user.userId)
  }

  @Subscription(() => UserTelemetrySubscriptionDto)
  public async userTelemetrySubscription(@Args('input') data: UserTelemetryInputDto,  @CurrentUser() user: IGetUser){
    this.logger.debug(`${this.questSubscription.name}: Execute method`);
    return this.subscriptionPresentationService.userTelemetrySubscription(user.userId, data);
  }

}
