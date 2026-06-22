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
  public constructor(
    private readonly accountPresentationService: AccountPresentationService,
  ) {}

  @Public()
  @Mutation(() => TokenType)
  public async createNewAccount(
    @Args('input') input: CreateNewAccountInput,
    @Context() ctx,
  ) {
    const value = await this.accountPresentationService.createNewAccount(input);

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
    return this.accountPresentationService.deleteAccount(id);
  }

  @Public()
  @Mutation(() => TokenType)
  public async login(@Args('input') input: LoginInputDTO, @Context() ctx) {
    const credentials =  await this.accountPresentationService.login(input);

    const response = ctx.res;

    response.cookie('access_token', credentials.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    response.cookie('refresh_token', credentials.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return credentials;
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
  public async getAccount(@Args('id') id: string){
    return this.accountPresentationService.getAccount(id)
  }

  @Query(() => Account)
  public async getAccountByEmail(@Args("email") email: string){
      return this.accountPresentationService.getAccountByEmail(email);
  }

  @Query(() => GetAccountFromTokenOutput)
  public async getAccountByToken(@CurrentUser() user:IGetCurrentUser) {
    return {
      accountId: user.accountId,
      userId: user.userId,
      email: user.email,
    }
  }
}
