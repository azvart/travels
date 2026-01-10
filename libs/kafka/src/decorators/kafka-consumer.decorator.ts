import 'reflect-metadata';

export const KAFKA_CONSUMER_METADATA = 'KAFKA_CONSUMER_METADATA';

export function KafkaConsumer(topic: string) {
  return (target: any, propertyKey) => {
    const exisiting =
      Reflect.getMetadata(KAFKA_CONSUMER_METADATA, target.constructor) || [];
    Reflect.defineMetadata(
      KAFKA_CONSUMER_METADATA,
      [...exisiting, { topic, methodName: propertyKey }],
      target.constructor,
    );
  };
}
