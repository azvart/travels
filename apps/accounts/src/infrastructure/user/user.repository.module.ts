import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAbstractRepository } from './user.abstract.repository';
import { UserRepository } from './user.repository';
import { UserEntity, UserQuestEntity } from '@app/entities/enity';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserQuestEntity])],
  providers: [
    {
      provide: UserAbstractRepository,
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: UserAbstractRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserRepositoryModule {}
