import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayload } from '@app/types/shared';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserPayload => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{req?: {user: UserPayload}; user:UserPayload }>()

    return gqlContext.user ?? gqlContext.req?.user
  },
);
