import { ObjectType, Field, PickType } from '@nestjs/graphql';
import { User } from './user.dto';
import { IUserFullInterface } from 'libs/interfaces';


@ObjectType()
export class UserFull extends PickType(User, ['id', 'accountId', 'age', 'firstName', 'lastName'])
  implements IUserFullInterface{

  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public countryCode?: string;

  @Field(() => String, {nullable: true})
  public street?: string;

  @Field(() => String, { nullable: true })
  public city?: string;
}
