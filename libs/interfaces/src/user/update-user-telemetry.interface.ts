export interface IUpdateUserTelemetry {
  userId: string;
  routeId: string;
  duration: number;
  steps: number;
  avgPace: number;
}
