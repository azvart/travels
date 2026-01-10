import { Module } from '@nestjs/common';

import { GqlAuthGuard } from '@app/decorators/guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class DecoratorsModule {}
