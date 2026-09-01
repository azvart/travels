import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from './user.abstract.repository';
import {
  IGetUser,
  IUpdateUserInputInterface,
  IUpdateUserTelemetry,
  IUserGamification,
  IUserTelemetry,
} from 'libs/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserEntity,
  UserGamificationEntity,
  UserStatisticEntity,
  UserTelemetryEntity,
} from '@app/entities/enity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserAbstractRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserTelemetryEntity)
    private readonly userTelemetryRepository: Repository<UserTelemetryEntity>,
    @InjectRepository(UserGamificationEntity)
    private readonly userGamificationRepository: Repository<UserGamificationEntity>,
  ) {}

  public async updateUser(userId: string, data: Omit<IUpdateUserInputInterface, 'id'>) {
    const updatedUser = await this.userRepository.update(userId, data);
    if (!updatedUser.affected) {
      throw new Error(`Can't update user with id: ${userId}`);
    }

    return this.userRepository.findOneOrFail({
      where: {
        id: userId,
      },
      relations: {
        account: true,
      },
    });
  }

  public async createUser(accountId: string) {
    return this.userRepository.save(
      this.userRepository.create({
        account: {
          id: accountId,
        },
      }),
    );
  }

  public async getUser(data: IGetUser) {
    return this.userRepository.findOneOrFail({
      where: {
        id: data.userId,
        account: {
          id: data.accountId,
          email: data.email,
        },
      },
      relations: {
        account: true,
      },
    });
  }

  public async findByAccountId(accountId: string) {
    return this.userRepository.findOneOrFail({
      where: {
        account: {
          id: accountId,
        },
      },
      relations: {
        account: true,
      },
    });
  }

  public async createUserGamification(userId: string) {
    return this.userGamificationRepository.save(
      this.userGamificationRepository.create({
        user: {
          id: userId,
        },
      }),
    );
  }

  public async createUserTelemetry(userId: string, routeId: string) {
    return this.userTelemetryRepository.save(
      this.userTelemetryRepository.create({
        userId,
        routeId,
      }),
    );
  }

  public async getUserTelemetry(userId: string, routeId: string): Promise<IUserTelemetry> {
    return this.userTelemetryRepository.findOneOrFail({
      where: {
        userId,
        routeId,
      },
    });
  }

  public async getUserGamification(userId: string): Promise<IUserGamification> {
    return this.userGamificationRepository.findOneOrFail({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  public async updateUserTelemetry(data: IUpdateUserTelemetry) {
    return !!(await this.userTelemetryRepository.update(
      {
        userId: data.userId,
        routeId: data.routeId,
      },
      {
        steps: data.steps,
        avgPace: data.avgPace,
        duration: data.duration,
      },
    ));
  }
}
