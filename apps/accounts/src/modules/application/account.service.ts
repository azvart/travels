import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountRepository } from '../domain/repositories/account.repository';
import { Account } from '@app/dto';
import { v4 as uuid } from 'uuid';
import { UpdateAccountInput } from '@app/types/account/inputs/update-account.input';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AccountsRedisService } from '@app/redis/modules/accounts.service';

@Injectable()
export class AccountService {
  public constructor(
    private readonly userService: UserService,
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly accountsRedisService: AccountsRedisService,
  ) {}

  public async createNewAccount(
    email: string,
    password: string,
    registrationType = 'credentials',
  ) {
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
      return {
        token: await this.jwtService.signAsync(payload, {
          secret: 'secret',
        }),
        id: account.id,
      };
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
    const user = await this.userService.findByAccountId(account.id);

    const payload = {
      accountId: account.id,
      email: account.email,
      userId: user?.id,
    };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: 'secret',
      }),
      id: account.id,
    };
  }
}
