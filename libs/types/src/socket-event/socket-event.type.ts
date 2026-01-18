import { SocketEventNamespace } from './socket-event-namespace.type';

export type SocketEvent = {
  namespace: SocketEventNamespace;
  event: string;
  payload: Record<string, unknown>;
};
