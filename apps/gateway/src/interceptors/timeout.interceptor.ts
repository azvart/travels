import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, timeoutWith } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly defaultTimeout = 5000,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeout =
      this.reflector.get<number>('timeout', context.getHandler()) ??
      this.defaultTimeout;

    return next.handle().pipe(
      timeoutWith(
        timeout,
        throwError(
          () => new RequestTimeoutException(`Handler exceeded ${timeout}ms`),
        ),
      ),
    );
  }
}
