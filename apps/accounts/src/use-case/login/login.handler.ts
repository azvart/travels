import { Injectable } from '@nestjs/common';
import { AccountAbstractRepository } from '../../infrastructure/account';
import { ILoginInput } from 'libs/interfaces';
import { GenerateTokenPairHandler } from '../generate-token-pair/generate-token-pair.handler';
import { compareSync } from 'bcrypt';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class LoginHandler {
  public constructor(
    private readonly accountRepository: AccountAbstractRepository,
    private readonly userRepository: UserAbstractRepository,
    private readonly generateTokenPairHandler: GenerateTokenPairHandler,
  ) {}

  public async run(data: ILoginInput) {
    const loginObj: Omit<ILoginInput, 'password'> = {
      email: data.email,
    };

    const account = await this.accountRepository.login(loginObj);

    const user = await this.userRepository.findByAccountId(account.id);

    if (!account) {
      throw new Error('Please enter a valid email');
    }

    const isComparedPassword = this.comparePassword(account.password, data.password);

    if (!isComparedPassword) {
      throw new Error('Invalid password');
    }

    return this.generateTokenPairHandler.run({
      accountId: account.id,
      email: account.email,
      userId: user.id,
      role: user.role,
    });
  }

  private comparePassword(hashedPassword: string, password: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
