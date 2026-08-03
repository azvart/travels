import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from './user-quest.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuestEntity } from '@app/entities';
import { Repository } from 'typeorm';
import { IFindManyUserQuests, IUpdateUserQuest, QuestStatusEnum } from 'libs/interfaces';

@Injectable()
export class UserQuestRepository implements UserQuestAbstractRepository {
  public constructor(
    @InjectRepository(UserQuestEntity)
    private readonly userQuestRepository: Repository<UserQuestEntity>,
  ) {}

  public async attachQuestToUser(userId: string, questId: string | string[]) {
    if (Array.isArray(questId)) {
      const userQuests = questId.map((id) =>
        this.userQuestRepository.create({
          userId,
          questId: id,
        }),
      );

      return this.userQuestRepository.save(userQuests);
    }
    return this.userQuestRepository.save(
      this.userQuestRepository.create({
        userId,
        questId,
      }),
    );
  }

  public async deleteQuests(questId: string | string[]) {
    const deletedQuests = await this.userQuestRepository.delete(questId);

    if (deletedQuests.affected === 0) {
      throw new Error(`Can't delete qeusts with ids: ${questId}`);
    }

    return {
      id: questId,
    };
  }

  public async updateQuests(userQuestId: string, data: IUpdateUserQuest) {
    const updateQuest = await this.userQuestRepository.update(
      {
        id: userQuestId,
      },
      {
        ...data,
      },
    );

    if (updateQuest.affected === 0) {
      throw new Error(`Cannot update quest with id: ${userQuestId}`);
    }

    return this.userQuestRepository.findOneOrFail({
      where: {
        id: userQuestId,
      },
    });
  }

  public async findManyUserQuests(userId: string, data: IFindManyUserQuests) {
    return this.userQuestRepository.find({
      where: {
        userId,
        ...data,
      },
    });
  }

  public async findOneUserQuest(userId: string, questId: string) {
    return this.userQuestRepository.findOneOrFail({
      where: {
        userId,
        questId,
      },
    });
  }

  public async completeQuest(userId: string, questId: string | string[]) {
    if (Array.isArray(questId)) {
      const updatedUserQuests = (
        await Promise.all(
          questId.map((id) =>
            this.userQuestRepository.update(
              {
                userId,
                questId: id,
              },
              {
                status: QuestStatusEnum.FINISHED,
                completedAt: new Date(),
                progress: 100,
                finishResult: 100,
              },
            ),
          ),
        )
      ).filter((item) => item.affected === 0);

      if (updatedUserQuests.length) {
        throw new Error('Some of quests does not update');
      }

      return Promise.all(
        questId.map((id) =>
          this.userQuestRepository.findOneOrFail({
            where: {
              userId,
              questId: id,
            },
          }),
        ),
      );
    }

    const updatedQuest = await this.userQuestRepository.update(
      {
        userId,
        questId,
      },
      {
        status: QuestStatusEnum.FINISHED,
        completedAt: new Date(),
      },
    );

    if (updatedQuest.affected === 0) {
      throw new Error(`Cannot update quest with id: ${questId}`);
    }

    return this.userQuestRepository.findOneOrFail({
      where: {
        userId,
        questId,
      },
    });
  }

  public async findAllUserQuests(userId?: string) {
    return this.userQuestRepository.find({
      where: {
        userId,
      },
    });
  }
}
