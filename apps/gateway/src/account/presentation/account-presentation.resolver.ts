import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AccountPresentationService } from './account-presentation.service';
import { Account, CreateNewAccountInput, UpdateAccountInput, UpdateAccountOutput } from './dto';
import { TokenType } from './dto/token-type.dto';
import { CurrentUser, Public } from '@app/auth';
import { LoginInputDTO } from './dto/login-input.dto';
import { GetAccountFromTokenOutput } from './dto/get-account-from-token-output.dto';
import { IGetCurrentUser } from 'libs/interfaces';

@Resolver(() => Account)
export class AccountPresentationResolver {
  public constructor(private readonly accountPresentationService: AccountPresentationService) {}

  @Public()
  @Mutation(() => TokenType)
  public async createNewAccount(@Args('input') input: CreateNewAccountInput) {
    return this.accountPresentationService.createNewAccount(input);
  }

  @Public()
  @Mutation(() => TokenType)
  public refreshTokens(@Args('refreshToken') refreshToken: string){
    return this.accountPresentationService.refreshToken(refreshToken);
  }

  @Mutation(() => Boolean)
  public async deleteAccount(@Args('id') id: string) {
    return this.accountPresentationService.deleteAccount(id);
  }

  @Public()
  @Mutation(() => TokenType)
  public async login(@Args('input') input: LoginInputDTO) {
    return this.accountPresentationService.login(input);
  }

  @Mutation(() => Boolean)
  public async logout(@Context() ctx) {
    return this.accountPresentationService.logout(ctx);
  }

  @Mutation(() => UpdateAccountOutput)
  public async updateExistingAccount(@Args('input') input: UpdateAccountInput) {
    return this.accountPresentationService.updateExistingAccount(input);
  }

  @Query(() => Account, { nullable: true })
  public async getAccount(@Args('id') id: string) {
    return this.accountPresentationService.getAccount(id);
  }

  @Query(() => Account)
  public async getAccountByEmail(@Args('email') email: string) {
    return this.accountPresentationService.getAccountByEmail(email);
  }

  @Query(() => GetAccountFromTokenOutput)
  public async getAccountByToken(@CurrentUser() user: IGetCurrentUser) {
    return {
      accountId: user.accountId,
      userId: user.userId,
      email: user.email,
    };
  }

  @Mutation(() => GetAccountFromTokenOutput)
  public async me(@CurrentUser() user: IGetCurrentUser){
    return {
      accountId: user.accountId,
      userId: user.userId,
      email: user.email,
    };
  }
}
