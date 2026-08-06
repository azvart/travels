import { Controller } from '@nestjs/common';
import { AwardsPresentationService } from './awards.presentation.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICreateAward, IUpdateAward } from 'libs/interfaces/awards';
import {
  ICreateUserAward,
  IFindManyUserAwards,
  IFindOneUserAward,
  IUpdateUserAward,
} from 'libs/interfaces/user-awards';

@Controller()
export class AwardsPresentationController {
  public constructor(private readonly awardsPresentationService: AwardsPresentationService) {}

  @GrpcMethod('Awards', 'createAward')
  public async createAward(data: ICreateAward) {
    return this.awardsPresentationService.createAward(data);
  }

  @GrpcMethod('Awards', 'updateAward')
  public async updateAward(data: IUpdateAward) {
    return this.awardsPresentationService.updateAward(data);
  }

  @GrpcMethod('Awards', 'deleteAward')
  public async deleteAward(id: string) {
    return this.awardsPresentationService.deleteAward(id);
  }

  @GrpcMethod('Awards', 'findManyAwards')
  public async findManyAwards() {
    return this.awardsPresentationService.findManyAwards();
  }

  @GrpcMethod('Awards', 'findOneAward')
  public async findOneAward(id: string) {
    return this.awardsPresentationService.findOneAward(id);
  }

  @GrpcMethod('Awards', 'createUserAward')
  public async createUserAward(data: ICreateUserAward) {
    return this.awardsPresentationService.createUserAward(data);
  }

  @GrpcMethod('Awards', 'updateUserAward')
  public async updateUserAward(data: IUpdateUserAward) {
    return this.awardsPresentationService.updateUserAward(data);
  }

  @GrpcMethod('Awards', 'deleteUserAward')
  public async deleteUserAward(data: { userAwardId: string; userId: string }) {
    return this.awardsPresentationService.deleteUserAward(data.userAwardId, data.userId);
  }

  @GrpcMethod('Awards', 'findManyUserAwards')
  public async findManyUserAwards(data: IFindManyUserAwards) {
    return this.awardsPresentationService.findManyUserAwards(data);
  }

  @GrpcMethod('Awards', 'findOneUserAwards')
  public async findOneUserAwards(data: IFindOneUserAward) {
    return this.awardsPresentationService.findOneUserAwards(data);
  }
}
