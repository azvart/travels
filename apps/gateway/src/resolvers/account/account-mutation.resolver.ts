import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import {
  Account,
  TokenType,
  UpdateAccountInput,
  UpdateAccountOutput,
} from '@app/types';
import { firstValueFrom } from 'rxjs';

import { AccountGrpcService } from '@app/grpc-api-clients';

@Resolver(() => Account)
export class AccountMutationResolver {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  @Mutation(() => UpdateAccountOutput)
  public async updateExistAccount(@Args('input') account: UpdateAccountInput) {
    return firstValueFrom(
      this.accountGrpcService.service.updateExistAccount({
        id: account.id,
        email: account.email,
        password: account.password,
      }),
    );
  }

  @Mutation(() => TokenType)
  public async createNewAccount(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('registrationType', { nullable: true }) registrationType: string,
    @Context() ctx,
  ) {
    const value = await firstValueFrom(
      this.accountGrpcService.service.createNewAccount({
        email,
        password,
        registrationType,
      }),
    );

    ctx.res.cookie('access_token', value.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return value;
  }

  @Mutation(() => Boolean)
  public async deleteAccount(@Args('id') id: string) {
    return firstValueFrom(
      this.accountGrpcService.service.deleteAccount({
        id,
      }),
    );
  }

  @Mutation(() => TokenType)
  public login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return firstValueFrom(
      this.accountGrpcService.service.login({
        email,
        password,
      }),
    );
  }
}
