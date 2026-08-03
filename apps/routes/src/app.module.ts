import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';
import { RoutePresentationModule } from './presentation/route.presentation.module';

@Module({
  imports: [AppConfigModule.forRootAsync(), RoutePresentationModule],
})
export class AppModule {}
