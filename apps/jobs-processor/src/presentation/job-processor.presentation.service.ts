import { Injectable } from '@nestjs/common';
import { QuestProgressHandler } from '../use-case/quest-progress/quest-progress.handler';
import { UpdateUserTelemetryHandler } from '../use-case/update-user-telemetry/update-user-telemetry.handler';


@Injectable()
export class JobProcessorPresentationService {


  public constructor(
    private readonly questProgressHandler: QuestProgressHandler,
    private readonly updateUserTelemetryHandler: UpdateUserTelemetryHandler
  ){}

  public async questProgress(){
    return this.questProgressHandler.run();
  }

  public async updateUserTelemetry(){
    return this.updateUserTelemetryHandler.run()
  }

}
