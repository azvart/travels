import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Injectable()
export class SubscriptionPresentationService {

  public constructor(
    @Inject('PUB_SUB')
    private readonly pubSub:PubSub
  ){}


  public async questSubscription(userId: string){
    return this.pubSub.asyncIterableIterator(`user-quest-sub-${userId}`);
  }
}
