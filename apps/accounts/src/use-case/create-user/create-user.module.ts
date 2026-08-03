import { Module } from '@nestjs/common';
import { CreateUserHandler } from './create-user.handler';
import { UserRepositoryModule } from '../../infrastructure/user';

@Module({
  imports: [UserRepositoryModule],
  providers: [CreateUserHandler],
  exports: [CreateUserHandler],
})
export class CreateUserModule {}
