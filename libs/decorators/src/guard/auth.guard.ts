import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{
      req: Request & {
        user: { userId: string; email: string; accountId: string };
      };
    }>().req;
    const auth = request.headers['authorization'] || '';
    const token = auth.replace('Bearer ', '');

    if (!token) return false;

    try {
      const user = this.jwtService.verify<{
        userId: string;
        email: string;
        accountId: string;
      }>(token, {
        secret: 'secret',
      });
      request.user = user;
      return true;
    } catch {
      return false;
    }
  }
}
