import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { GqlSubscriptionContext, GqlContext } from 'libs/interfaces/gql-context';
import { IJWTPayload } from 'libs/interfaces/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthGuard.name);

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
    this.logger.debug('isSubscription', isSubscription);

    const token = isSubscription
      ? this.extractTokenFromSubscription(ctx.getContext<GqlSubscriptionContext>())
      : this.extractTokenFromHeader(this.getRequest(context));

    if (!token) {
      this.logger.error('Token not provided');
      throw new UnauthorizedException('Token not provided');
    }

    let payload: IJWTPayload;

    try {
      payload = await this.jwtService.verifyAsync<IJWTPayload>(token, {
        secret: 'secret',
      });
    } catch (e) {
      if (e instanceof TokenExpiredError && !isSubscription) {
        payload = await this.tryRefresh(context);
      } else if (e instanceof TokenExpiredError && isSubscription) {
        payload = await this.tryRefreshFromSubscription(context);
      } else {
        this.logger.error('Error', e);
        throw new UnauthorizedException('Invalid or expired token', {
          cause: e,
        });
      }
    }

    const user = {
      userId: payload.userId,
      email: payload.email,
      accountId: payload.accountId,
    };

    if (isSubscription) {
      ctx.getContext<GqlSubscriptionContext & { user: IJWTPayload }>().user = user;
    } else {
      (this.getRequest(context) as any).user = user;
    }

    return true;
  }

  private async tryRefresh(context: ExecutionContext): Promise<IJWTPayload> {
    const request = this.getRequest(context);
    const refreshToken = request.headers['x-refresh-token'] as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException('Access token expired, refresh token not provided');
    }

    let refreshPayload: IJWTPayload;

    try {
      refreshPayload = await this.jwtService.verifyAsync<IJWTPayload>(refreshToken, {
        secret: 'secret',
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token', { cause: e });
    }

    return refreshPayload;
  }

  private async tryRefreshFromSubscription(context: ExecutionContext) {
    const subscriptionRequest =
      GqlExecutionContext.create(context).getContext<GqlSubscriptionContext>();
    const refreshTokenFromSubscription =
      (subscriptionRequest?.extra?.request?.headers?.['x-refresh-token'] as string) ??
      (subscriptionRequest.connectionParams?.['x-refresh-token'] as string);

    if (!refreshTokenFromSubscription) {
      throw new UnauthorizedException('Access token expired, refresh token not provided');
    }

    let refreshPayload: IJWTPayload;

    try {
      refreshPayload = await this.jwtService.verifyAsync<IJWTPayload>(
        refreshTokenFromSubscription,
        {
          secret: 'secret',
        },
      );
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token', { cause: e });
    }

    return refreshPayload;
  }

  private getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GqlContext>().req;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization ?? '';
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
  private extractTokenFromSubscription(context: GqlSubscriptionContext): string | null {
    const raw =
      context?.extra?.request?.headers?.authorization ??
      context.connectionParams?.authorization ??
      '';
    const [type, token] = raw.split(' ');
    if (type === 'Bearer') return token ?? null;
    if (type) return type;

    return null;
  }
}
