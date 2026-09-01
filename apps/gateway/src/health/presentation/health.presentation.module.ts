import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthPresentationController } from './health.presentation.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthPresentationController],
})
export class HealthPresentationModule {}
