import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IJWTPayload } from 'libs/interfaces/jwt';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const gqlContext = ctx.getContext<{ req?: { user: IJWTPayload }; user: IJWTPayload }>();

  return gqlContext.user ?? gqlContext.req?.user;
});
