export abstract class JobsRepository {
  abstract enqueueVerifiedEmail(payload: { email: string }): Promise<void>;
  abstract enqueueWeatherData(): Promise<void>;
}
