import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Account } from '@app/types';
import { firstValueFrom } from 'rxjs';
import { GqlAuthGuard } from '../../guards/auth-guard';
import { AccountGrpcService } from '@app/grpc-api-clients/account/account-grpc.service';

@Resolver(() => Account)
export class AccountQueriesResolver {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  @Query(() => Account, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async getAccount(@Args('id') id: string) {
    return firstValueFrom(
      this.accountGrpcService.service.getAccount({
        id,
      }),
    );
  }

  @Query(() => Account, { nullable: true })
  public async getAccountByEmail(@Args('email') email: string) {
    return firstValueFrom(
      this.accountGrpcService.service.getAccountByEmail({
        email,
      }),
    );
  }
}
