import { Module } from '@nestjs/common';
import { UpdateUserHandler } from './update-user.handler';
import { UserRepositoryModule } from '../../infrastructure/user';

@Module({
  imports: [UserRepositoryModule],
  providers: [UpdateUserHandler],
  exports: [UpdateUserHandler],
})
export class UpdateUserModule {}
