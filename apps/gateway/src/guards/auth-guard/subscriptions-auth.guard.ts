import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SubscriptionsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    const token = this.extractToken(gqlContext);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      gqlContext.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(context: any): string | null {
    if (context.req?.headers?.authorization) {
      const [type, token] = context.req.headers.authorization.split(' ');
      return type === 'Bearer' ? token : null;
    }
    if (context.connectionParams?.Authorization) {
      const [type, token] = context.connectionParams.Authorization.split(' ');
      return type === 'Bearer' ? token : null;
    }

    return null;
  }
}
