import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { AccountAbstractRepository } from '../../infrastructure/account';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import { UserAbstractRepository } from '../../infrastructure/user';
import { GenerateTokenPairHandler } from '../generate-token-pair/generate-token-pair.handler';
import { DataSource } from 'typeorm';
import { UserStatisticAbstractRepository } from '../../infrastructure/user-statistic';

@Injectable()
export class CreateAccountHandler {
  public constructor(
    private dataSource: DataSource,
    private readonly accountRepository: AccountAbstractRepository,
    private readonly userRepository: UserAbstractRepository,
    private readonly userStatisticRepository: UserStatisticAbstractRepository,
    private readonly generateTokenPairHandler: GenerateTokenPairHandler,
  ) {}

  public async run(data: ICreateNewAccount) {
    const hashedPassword = this.hashedPassword(data.password);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account = await this.accountRepository.createAccount({
        ...data,
        password: hashedPassword,
      });

      const user = await this.userRepository.createUser(account.id);
      await this.userStatisticRepository.createUserStatistic(user.id);

      await this.userRepository.createUserGamification(user.id);

      await queryRunner.commitTransaction();

      return this.generateTokenPairHandler.run({
        accountId: account.id,
        userId: user.id,
        email: account.email,
        role: user.role,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private hashedPassword(password: string): string {
    if (!password) {
      throw new Error('Password must be provided');
    }
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
