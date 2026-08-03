import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.dto';
import { IUserGamification } from 'libs/interfaces';


@ObjectType()
export class UserGamificationDto
  implements IUserGamification {


  @Field(() => ID)
  public id: string;

  @Field(() => User, { nullable: true })
  public user?: User;

  @Field(() => Number)
  public userLevel: number;

  @Field(() => Number)
  public userLevelProgress: number;
}
