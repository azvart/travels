import { Injectable } from '@nestjs/common';
import { KafkaConsumer } from '@app/kafka';
import { pubSub } from '@app/pubsub';

@Injectable()
export class WeatherEventsHandler {
  @KafkaConsumer('weather.processing')
  async handlerWeather(event: { event: string; payload: any }) {
    if (event.event !== 'weather.processing') return;
    await pubSub.publish('weatherProcessing', event.payload);
  }
}
