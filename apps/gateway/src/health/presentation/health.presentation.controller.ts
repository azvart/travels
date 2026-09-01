import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '@app/auth';

@Controller('health')
export class HealthPresentationController {
  public constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('gateway_memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('gateway_memory_RSS', 150 * 1024 * 1024),
    ]);
  }
}
