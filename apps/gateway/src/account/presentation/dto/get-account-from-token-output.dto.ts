import { Field, ObjectType } from '@nestjs/graphql';
import { IGetAccountFromTokenOutput } from 'libs/interfaces';


@ObjectType()
export class GetAccountFromTokenOutput
  implements IGetAccountFromTokenOutput {
  @Field(() => String)
  public accountId!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public email!: string;
}
