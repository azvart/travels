import { Injectable } from '@nestjs/common';
import { IJWTPayload } from 'libs/interfaces/jwt';
import { JwtService } from '@nestjs/jwt';
import { UserRedisService } from '@app/redis';
import { ITokenType } from 'libs/interfaces';

@Injectable()
export class GenerateTokenPairHandler {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userRedisService: UserRedisService,
  ) {}

  public async run(data: IJWTPayload): Promise<ITokenType> {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: 'secret',
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(data, {
      secret: 'secret',
      expiresIn: '30d',
    });

    await this.userRedisService.saveUserRefreshToken(data.userId, refreshToken);

    return {
      id: data.accountId,
      token: accessToken,
      refreshToken,
    };
  }
}
