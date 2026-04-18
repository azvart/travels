import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UpdateUserInput, User } from '@app/types';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/decorators/guard';

@Resolver(() => User)
export class UserMutationResolver {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  public async updateUser(
    @Args('input') user: UpdateUserInput,
    @Context() ctx: any,
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
}
