import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountAbstractRepository } from '../abstracts/account.abstract.repository';
import { Account } from '@app/dto';
import { v4 as uuid } from 'uuid';
import { UpdateAccountInput } from '@app/types/account/inputs/update-account.input';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AccountsRedisService } from '@app/redis/modules/accounts.service';
import { UserRedisService } from '@app/redis';

interface JWTPayload {
  userId: string;
  email: string;
  accountId: string;
}

@Injectable()
export class AccountService {
  public constructor(
    private readonly userService: UserService,
    private readonly accountRepository: AccountAbstractRepository,
    private readonly jwtService: JwtService,
    private readonly accountsRedisService: AccountsRedisService,
    private readonly userRedisService: UserRedisService,
  ) {}

  public async createNewAccount(email: string, password: string, registrationType = 'credentials') {
    if (await this.accountRepository.findByEmail(email)) {
      throw new Error('Account already exists');
    }
    const account = new Account(uuid(), email, password, registrationType);
    await this.accountRepository.save(account);
    const createdAccount = await this.accountRepository.findById(account.id);
    const createNewUser = await this.userService.createNewUser(account.id);

    if (createdAccount && createNewUser) {
      await this.accountsRedisService.setAccount(account.id, {
        id: createdAccount.id,
        email: createdAccount.email,
        isEmailVerified: createdAccount.isEmailVerified,
      });
      const payload = {
        accountId: account.id,
        email: account.email,
        userId: createNewUser.id,
      };

     return await this.generateTokenPair(payload);
    } else {
      throw new UnauthorizedException();
    }
  }

  public async getAccountById(id: string) {
    return this.accountRepository.findById(id);
  }

  public async getAccountByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findByEmail(email);
  }

  public async updateAccount(account: UpdateAccountInput) {
    return this.accountRepository.updateAccount(account);
  }

  public async deleteAccount(id: string) {
    await this.accountRepository.deleteAccount(id);
    return true;
  }

  public async verifyAccountEmail(email: string, id: string) {
    await this.accountsRedisService.deleteAccount(id);
    return this.accountRepository.verifyAccountEmail(email);
  }

  public async login(email: string, password: string) {
    const account = await this.accountRepository.login(email, password);
    if (account) {
      const user = await this.userService.findByAccountId(account.id);

      if (user) {
        await this.userRedisService.setUser(user.id, { login: true });
      }

      const payload = {
        accountId: account.id,
        email: account.email,
        userId: user?.id as string,
      };

      return await this.generateTokenPair(payload);
    } else {
      throw new UnauthorizedException();
    }
  }

  public async loginByToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isTokenValid = await this.jwtService.verifyAsync(token, {
      secret: 'secret',
    });

    if (!isTokenValid) {
      throw new Error('Invalid token');
    }

    return this.jwtService.decode<{
      accountId: string;
      email: string;
      userId: string;
    }>(token);
  }

  public async logout(input: { userId: string; accountId: string }) {
    await this.userRedisService.setUser(input.userId, { login: false });
    return true;
  }

  private async generateTokenPair(input: JWTPayload){
    const accessToken = await this.jwtService.signAsync(input,{
      secret: 'secret',
      expiresIn: '15m'
    })

    const refreshToken = await this.jwtService.signAsync(input, {
      secret: 'secret',
      expiresIn: '30d'
    })

    await this.userRedisService.saveUserRefreshToken(input.userId, refreshToken);

    return {
      id: input.accountId,
      token: accessToken,
      refreshToken: refreshToken
    }

  }

  public async refreshToken(refreshToken: string){
    let payload: JWTPayload;

    try {
      payload = await this.jwtService.verifyAsync<JWTPayload>(refreshToken, {
        secret: 'secret',
      })
    }catch{
      throw new UnauthorizedException("INVALID_REFRESH_TOKEN");
    }

    const storedHash = await this.userRedisService.getUserRefreshToken(payload.userId);

    if(!storedHash || storedHash !== this.userRedisService.hashToken(refreshToken)){
      await this.userRedisService.deleteUserRefreshToken(payload.userId);
      throw new UnauthorizedException("REFRESH_TOKEN_REUSED_OR_EXPIRED");
    }

    return this.generateTokenPair({
      userId: payload.userId,
      email: payload.email,
      accountId: payload.accountId
    })

  }
}
