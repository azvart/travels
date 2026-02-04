import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountAbstractRepository } from '../abstracts/account.abstract.repository';
import { Account } from '@app/dto';
import { AccountOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { PasswordVo } from '../value-object/password.vo';
import { UpdateAccountInput } from '@app/types/account/inputs/update-account.input';

@Injectable()
export class AccountTypeormRepository implements AccountAbstractRepository {
  public constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly accountRepository: Repository<AccountOrmEntity>,
  ) {}

  public async save(account: Account) {
    await this.accountRepository.save(
      this.accountRepository.create({
        id: account.id,
        email: account.email,
        password: new PasswordVo(account.password).getHashedPasswordValue(),
        registrationType: account.registrationType,
      }),
    );
  }

  public async findById(id: string): Promise<Account | null> {
    const orm = await this.accountRepository.findOne({
      where: { id },
    });
    return orm
      ? new Account(orm.id, orm.email, orm.password, orm.registrationType)
      : null;
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const orm = await this.accountRepository.findOne({ where: { email } });
    return orm
      ? new Account(orm.id, orm.email, orm.password, orm.registrationType)
      : null;
  }

  public async deleteAccount(id: string) {
    await this.accountRepository.delete({
      id: id,
    });
    return true;
  }

  public async updateAccount(account: UpdateAccountInput) {
    await this.accountRepository.update(account.id, {
      email: account.email,
      ...(account.password
        ? {
            password: new PasswordVo(account.password).getHashedPasswordValue(),
          }
        : {}),
    });

    return this.findById(account.id);
  }
  public async verifyAccountEmail(email: string) {
    await this.accountRepository.update(
      {
        email,
      },
      {
        isEmailVerified: true,
      },
    );

    const orm = await this.accountRepository.findOne({
      where: { email },
    });

    return orm
      ? new Account(orm.id, orm.email, orm.password, orm.registrationType)
      : null;
  }

  public async login(email: string, password: string) {
    const account = await this.findByEmail(email);
    if (!account) {
      throw new Error('Please enter a valid email');
    }

    const isComparedPassord = PasswordVo.comparePassword(
      account.password,
      password,
    );

    if (!isComparedPassord) {
      throw new Error('Invalid password');
    }

    return new Account(
      account.id,
      account.email,
      account.password,
      account.registrationType,
    );
  }
}
