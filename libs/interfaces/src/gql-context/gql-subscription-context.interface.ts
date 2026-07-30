import { Request } from 'express';

export interface GqlSubscriptionContext {
  connectionParams?: {
    token?: string;
    authorization?: string;
  };
  extra: {
    request?: Request;
  };
}
