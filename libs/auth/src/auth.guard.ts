import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import {
  GqlContext,
  GqlSubscriptionContext,
  UserPayload,
} from '@app/types/shared';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const ctx = GqlExecutionContext.create(context);
    const isSubscription = ctx.getInfo().operation.operation === 'subscription';



    const token = isSubscription
      ? this.extractTokenFromSubscription(ctx.getContext<GqlSubscriptionContext>())
      : this.extractTokenFromHeader(this.getRequest(context))

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token);
      const user = {
        userId: payload.userId,
        email: payload.email,
        accountId: payload.accountId,
      };
      if(isSubscription){
        ctx.getContext<GqlSubscriptionContext & { user: UserPayload }>().user = user;
      }else {
        (this.getRequest(context) as any).user = user;
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private getRequest(context: ExecutionContext):Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GqlContext>().req;
  }

  private extractTokenFromHeader(request:Request): string | null {
    const authHeader = request.headers.authorization ?? ""
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
  private extractTokenFromSubscription(context: GqlSubscriptionContext): string | null {
    const raw = context.connectionParams?.authorization ?? context.connectionParams?.token ?? '';
    const [type, token] = raw.split(' ');
    if(type === 'Bearer') return token ?? null;
    if (type) return type;

    return null;
  }
}
