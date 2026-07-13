import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';

@Module({
  imports: [AppConfigModule.forRootAsync()],
  controllers: [],
  providers: [],
})
export class QuestModule {}
