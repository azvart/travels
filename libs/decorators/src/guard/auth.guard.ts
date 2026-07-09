import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, TokenExpiredError} from '@nestjs/jwt';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";

export interface JWTPayload {
 userId: string;
 email: string;
 accountId: string;
}


@Injectable()
export class GqlAuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{
      req: Request & { user:JWTPayload };
    }>().req;
    const auth = request.headers['authorization'] || '';
    const token = auth.replace('Bearer ', '');
    if (!token){
      throw new UnauthorizedException('NO_TOKEN')
    }

    try {
      const user = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: this.configService.get<string>("JWT_SECRET")
      });

      request.user = user;
      return true;
    } catch(error) {
      if(error instanceof TokenExpiredError){
        throw new UnauthorizedException('TOKEN_EXPIRED');
      }
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
