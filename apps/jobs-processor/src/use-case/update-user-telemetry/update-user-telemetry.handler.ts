import { Injectable, Logger } from '@nestjs/common';
import { UserTelemetryService } from '@app/redis';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UpdateUserTelemetryHandler {
  private readonly logger: Logger = new Logger(UpdateUserTelemetryHandler.name);

  public constructor(
    private readonly userTelemetryService: UserTelemetryService,
    private readonly accountGrpcService: AccountGrpcService,
  ) {}

  public async run() {
    const data = await this.userTelemetryService.getAllUserTelemetry();
    this.logger.debug(data);
    await Promise.all(
      data.map(async (item) => {
        await firstValueFrom(
          this.accountGrpcService.service.updateUserTelemetry({
            userId: item.userId,
            routeId: item.routeId,
            steps: item.steps,
            avgPace: item.avgPace,
            duration: item.duration,
          }),
        );
      }),
    );
  }
}
