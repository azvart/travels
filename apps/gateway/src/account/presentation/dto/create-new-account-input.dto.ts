import { InputType, Field } from '@nestjs/graphql';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';

@InputType()
export class CreateNewAccountInput implements ICreateNewAccount {
  @Field(() => String)
  public email!: string;

  @Field(() => String)
  public password!: string;
}
