import { Module } from '@nestjs/common';
import { AwardsPresentationService } from './awards.presentation.service';
import { CreateUserAwardModule } from '../use-case/create-user-award/create-user-award.module';
import { CreateAwardModule } from '../use-case/create-award/create-award.module';
import { UpdateUserAwardModule } from '../use-case/update-user-award/update-user-award.module';
import { UpdateAwardModule } from '../use-case/update-award/update-award.module';
import { FindManyUserAwardsModule } from '../use-case/find-many-user-awards/find-many-user-awards.module';
import { FindManyAwardsModule } from '../use-case/find-many-awards/find-many-awards.module';
import { FindOneUserAwardsModule } from '../use-case/find-one-user-awards/find-one-user-awards.module';
import { FindOneAwardModule } from '../use-case/find-one-award/find-one-award.module';
import { DeleteUserAwardModule } from '../use-case/delete-user-award/delete-user-award.module';
import { DeleteAwardModule } from '../use-case/delete-award/delete-award.module';
import { AwardsPresentationController } from './awards.presentation.controller';

@Module({
  imports: [
    CreateUserAwardModule,
    CreateAwardModule,
    UpdateUserAwardModule,
    UpdateAwardModule,
    FindManyUserAwardsModule,
    FindManyAwardsModule,
    FindOneUserAwardsModule,
    FindOneAwardModule,
    DeleteUserAwardModule,
    DeleteAwardModule,
  ],
  controllers: [AwardsPresentationController],
  providers: [AwardsPresentationService],
})
export class AwardsPresentationModule {}
