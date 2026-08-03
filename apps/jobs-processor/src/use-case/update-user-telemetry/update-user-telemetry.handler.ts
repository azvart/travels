import { Injectable, Logger } from '@nestjs/common';
import { UserTelemetryService } from '@app/redis';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { IUpdateUserTelemetry } from 'libs/interfaces';

@Injectable()
export class UpdateUserTelemetryHandler {
  private readonly logger: Logger = new Logger(UpdateUserTelemetryHandler.name);

  public constructor(
    private readonly userTelemetryService: UserTelemetryService,
    private readonly accountGrpcService: AccountGrpcService,
  ) {}

  public async run() {
    const data = await this.userTelemetryService.getAllUserTelemetry();
    const values = Object.values(data);
    const mapData = values.map((item) => JSON.parse(item));
    const freshData = (
      await Promise.all(
        mapData.map(
          async (item) =>
            await this.userTelemetryService.getUserRouteTelemetry(item.userId, item.routeId),
        ),
      )
    ).flatMap((item) => (item ? item : []));
    const freshMapData: IUpdateUserTelemetry[] = freshData.map((item) => JSON.parse(item));
    this.logger.debug(freshMapData);
    await Promise.all(
      freshMapData.map(async (item) => {
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
