import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject('CACHE_MANAGER') private readonly cache: Cache,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const ttl = this.reflector.get<number>('cache_ttl', context.getClass());

    if (request.method !== 'GET') return next.handle();

    const cacheKey = this.buildKey(context);
    const cache = await this.cache.get(cacheKey);

    if (cache) {
      return of(cache);
    }
    return (
      next
        .handle()
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .pipe(tap((response) => this.cache.set(cacheKey, response, ttl)))
    );
  }

  private buildKey(context: ExecutionContext): string {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: { id: number } }>();
    const user = request.user?.id ?? 'anonymous';

    return `${user} ${request.url}`;
  }
}
