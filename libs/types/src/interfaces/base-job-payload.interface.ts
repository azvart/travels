export interface IBaseJobPayload {
  readonly alias: string;
  readonly payload?: Record<string, unknown>;
}
