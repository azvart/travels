import { ObjectType, Field, PickType } from '@nestjs/graphql';
import { User } from './user.dto';
import { IUser } from 'libs/interfaces';


@ObjectType()
export class UserFull extends PickType(User, ['id', 'age', 'firstName', 'lastName'])
  implements IUser {

  @Field(() => String, { nullable: true })
  public country?: string;

  @Field(() => String, { nullable: true })
  public countryCode?: string;

  @Field(() => String, {nullable: true})
  public street?: string;

  @Field(() => String, { nullable: true })
  public city?: string;
}
