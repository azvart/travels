import { Injectable, Logger } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { AccountOutput } from '@app/proto';

@Injectable()
export class EmailVerifiedService {
  private readonly logger = new Logger(EmailVerifiedService.name);

  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  async verifyEmail(payload: {
    email: string;
    id: string;
    isEmailVerified: boolean;
  }): Promise<AccountOutput> {
    this.logger.log(`Start verify email ${payload.email}`);
    return firstValueFrom(
      this.accountGrpcService.service.verifyEmailAccount({
        email: payload.email,
        id: payload.id,
      }),
    );
  }
}
