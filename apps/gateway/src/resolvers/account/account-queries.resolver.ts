import { Resolver, Query, Args } from '@nestjs/graphql';
import { Account, GetAccountFromTokenOutput } from '@app/types';
import { firstValueFrom } from 'rxjs';
import { AccountGrpcService } from '@app/grpc-api-clients/account/account-grpc.service';
import { CurrentUser } from '@app/auth';
import { UserPayload } from '@app/types/shared';

@Resolver(() => Account)
export class AccountQueriesResolver {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  @Query(() => Account, { nullable: true })
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

  @Query(() => GetAccountFromTokenOutput)
  public getAccountByToken(@CurrentUser() user:UserPayload) {

    return {
      accountId: user.accountId,
      userId: user.userId,
      email: user.email,
    };
  }
}
