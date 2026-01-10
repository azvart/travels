import { Module, OnModuleInit } from '@nestjs/common';
import { KafkaModule } from '@app/kafka';
import { ConsumerRegistry } from '@app/kafka';
import { WeatherEventsHandler } from './weather-events.handler';

@Module({
  imports: [KafkaModule],
  providers: [WeatherEventsHandler],
})
export class WeatherProcessorModule implements OnModuleInit {
  constructor(
    private registry: ConsumerRegistry,
    private handler: WeatherEventsHandler,
  ) {}

  onModuleInit() {
    this.registry.register(this.handler);
  }
}
