import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class PasswordVo {
  private readonly value: string;

  constructor(password: string) {
    if (!password) {
      throw new Error('Password must be provided');
    }
    const salt = genSaltSync(10);
    this.value = hashSync(password, salt);
  }

  public getHashedPasswordValue(): string {
    return this.value;
  }

  static comparePassword(hashedPassword: string, password: string): boolean {
    return compareSync(password, hashedPassword);
  }
}
