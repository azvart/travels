import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from './roles.decorators';
import { IGetUser, UserRoleEnum } from 'libs/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: { user: IGetUser } }>().req;
    const user = request.user;
    return this.matchRoles(roles, user);
  }

  private matchRoles(roles: UserRoleEnum, currentUser: IGetUser): boolean {
    if (!currentUser) {
      return false;
    }
    return roles === currentUser.role;
  }
}
