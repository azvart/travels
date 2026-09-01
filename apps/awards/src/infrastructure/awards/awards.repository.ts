import { Injectable } from '@nestjs/common';
import { AwardsAbstractRepository } from './awards.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AwardsEntity } from '@app/entities';
import { Repository } from 'typeorm';
import { ICreateAward, IUpdateAward } from 'libs/interfaces/awards';

@Injectable()
export class AwardsRepository implements AwardsAbstractRepository {
  public constructor(
    @InjectRepository(AwardsEntity)
    private readonly awardsRepository: Repository<AwardsEntity>,
  ) {}

  public async createAward(data: ICreateAward) {
    return this.awardsRepository.save(
      this.awardsRepository.create({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
      }),
    );
  }

  public async updateAward(data: IUpdateAward) {
    const updatedAwards = await this.awardsRepository.update(data.id, {
      name: data.name,
      description: data.description,
      ...(data.imageUrl ? { imageUrl: data.imageUrl } : {}),
      updatedAt: new Date(),
    });
    if (!updatedAwards.affected) {
      throw new Error(`Awards with id: ${data.id} can't be updated`);
    }
    return this.awardsRepository.findOneOrFail({
      where: {
        id: data.id,
      },
    });
  }

  public async deleteAward(id: string) {
    const award = await this.awardsRepository.findOneOrFail({
      where: {
        id,
      },
    });

    if (!award) {
      throw new Error(`Award with id ${id} not exist`);
    }

    const deletedAward = await this.awardsRepository.delete(id);

    if (!deletedAward.affected) {
      throw new Error(`Can't delete award with id ${id}`);
    }

    return award;
  }

  public async findManyAwards() {
    return this.awardsRepository.find();
  }

  public async findOneAward(id: string) {
    return this.awardsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }
}
