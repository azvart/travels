import { Injectable } from '@nestjs/common';
import { AchievementsAbstractRepository } from '../abstracts/achievements.abstract.repository';
import { Achievements } from '@app/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementsEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { AchievementRedisService } from '@app/redis';

@Injectable()
export class AchievementTypeormRepository
  implements AchievementsAbstractRepository
{
  public constructor(
    @InjectRepository(AchievementsEntity)
    private readonly achievementsOrmRepository: Repository<AchievementsEntity>,
    private readonly achievementRedisService: AchievementRedisService,
  ) {}

  public async findOneById(id: string): Promise<Achievements | null> {
    const ormEntity = await this.achievementsOrmRepository.findOneBy({
      id,
    });
    return Achievements.fromEntity(ormEntity);
  }

  public async findMany(): Promise<(AchievementsEntity | null)[]> {
    const ormEntity = await this.achievementsOrmRepository.find();

    return ormEntity.map((item) => Achievements.fromEntity(item));
  }

  public async create(
    name: string,
    points: number,
  ): Promise<Achievements | null> {
    const ormEntityCreate = this.achievementsOrmRepository.create({
      name,
      points,
    });
    const saveOrmEntity =
      await this.achievementsOrmRepository.save(ormEntityCreate);

    await this.achievementRedisService.setAchievement(saveOrmEntity.id, {
      name: saveOrmEntity.name,
      points: saveOrmEntity.points,
    });

    return Achievements.fromEntity(saveOrmEntity);
  }

  public async deleteById(id: string): Promise<boolean> {
    const ormEntity = await this.achievementsOrmRepository.delete({
      id,
    });
    return !!ormEntity.affected;
  }

  public async attachAchievementToUser(userId: string, achievementId: string) {}
}
