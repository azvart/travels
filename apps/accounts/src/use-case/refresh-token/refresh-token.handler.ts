import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenerateTokenPairHandler } from '../generate-token-pair/generate-token-pair.handler';
import { IJWTPayload } from 'libs/interfaces/jwt';
import { JwtService } from '@nestjs/jwt';
import { UserRedisService } from '@app/redis';

@Injectable()
export class RefreshTokenHandler {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly generateTokenPairHandler: GenerateTokenPairHandler,
    private readonly userRedisService: UserRedisService,
  ) {}

  public async run(refreshToken: string) {
    let payload: IJWTPayload;

    try {
      payload = await this.jwtService.verifyAsync<IJWTPayload>(refreshToken, {
        secret: 'secret',
      });
    } catch {
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN');
    }

    const storedHash = await this.userRedisService.getUserRefreshToken(payload.userId);

    if (!storedHash || storedHash !== this.userRedisService.hashToken(refreshToken)) {
      await this.userRedisService.deleteUserRefreshToken(payload.userId);
      throw new UnauthorizedException('REFRESH_TOKEN_REUSED_OR_EXPIRED');
    }

    return this.generateTokenPairHandler.run({
      userId: payload.userId,
      email: payload.email,
      accountId: payload.accountId,
      role: payload.role,
    });
  }
}
