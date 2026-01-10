import { ObjectType, OmitType } from '@nestjs/graphql';
import { Account } from '@app/types/account';

@ObjectType()
export class UpdateAccountOutput extends OmitType(
  Account,
  ['user'],
  ObjectType,
) {}
