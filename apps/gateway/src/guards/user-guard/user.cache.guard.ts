import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';

export const UserCacheGuard = (ttl = 60) =>
  applyDecorators(
    SetMetadata('cache_ttl', ttl),
    UseInterceptors(CacheInterceptor),
  );
