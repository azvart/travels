import { UserPayload } from '@app/types/shared/user-payload.type';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
