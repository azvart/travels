import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req, res } = ctx.getContext<{
      req: Request;
      res: Response;
      user: any;
    }>();

    const token =
      (req.cookies['access_token'] as string) ||
      (req.headers['authorization']?.replace('Bearer ', '') as string);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret',
      ) as jwt.JwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ctx.getContext().user = payload;
      if (payload.exp && Date.now() / 1000 > payload.exp - 60 * 5) {
        const newToken = jwt.sign(
          { sub: payload.sub },
          process.env.JWT_SECRET || 'secret',
          {
            expiresIn: '1h',
          },
        );

        res.cookie('access_token', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60,
        });
      }
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
