import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  UpdateUserInput,
  User,
  UserAddressType,
  UpdateUserAddressInput,
} from '@app/types';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '@app/auth';
import { UserPayload } from '@app/types/shared';

@Resolver(() => User)
export class UserMutationResolver {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  @Mutation(() => User)
  public async updateUser(
    @Args('input') user: UpdateUserInput,
    @CurrentUser() currentUser: UserPayload
  ) {
    return firstValueFrom(
      this.accountGrpcService.service.updateUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lasName,
        age: user.age,
      }),
    );
  }
  @Mutation(() => UserAddressType)
  public async updateUserAddress(@Args('input') input: UpdateUserAddressInput) {
    return firstValueFrom(
      this.accountGrpcService.service.updateUserAddress({
        ...input,
      }),
    );
  }

  @Mutation(() => User)
  public async attachQuestToUser(
    @Args('questId') questId: string,
    @CurrentUser() user: UserPayload
  ) {
    // return firstValueFrom();
  }
}
