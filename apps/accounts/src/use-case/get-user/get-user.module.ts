import { Module } from '@nestjs/common';
import { GetUserHandler } from './get-user.handler';
import { UserRepositoryModule } from '../../infrastructure/user';


@Module({
  imports: [UserRepositoryModule],
  providers: [GetUserHandler],
  exports: [GetUserHandler],
})
export class GetUserModule {}
