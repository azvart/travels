import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

import {
  ACHIEVEMENT_PACKAGE_NAME,
  ACHIEVEMENTS_SERVICE_NAME,
  AchievementsClient,
} from '@app/proto/generated/achievements/achievement';

@Injectable()
export class AchievementsGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: ACHIEVEMENT_PACKAGE_NAME,
      protoPath: join(
        process.cwd(),
        'libs/proto/src/achievements',
        'achievement.proto',
      ),
      url: `0.0.0.0:${process.env.ACHIEVEMENTS_GRPC_PORT || 5054}`,
    },
  })
  private readonly client: ClientGrpc;

  public service: AchievementsClient;

  onModuleInit() {
    this.service = this.client.getService<AchievementsClient>(
      ACHIEVEMENTS_SERVICE_NAME,
    );
    console.log('Achievements grpc service init');
  }
}
