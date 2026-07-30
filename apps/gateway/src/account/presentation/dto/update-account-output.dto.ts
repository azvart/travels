import { ObjectType, OmitType } from '@nestjs/graphql';
import { Account } from './account.dto';
import { IAccount } from 'libs/interfaces';

@ObjectType()
export class UpdateAccountOutput
  extends Account
  implements IAccount {}
