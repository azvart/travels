import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from './quest.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestEntity } from './quest.entity';
import { Repository } from 'typeorm';
import { ICreateQuest, IFindMany, IQuest, IUpdateQuest } from 'libs/interfaces';


@Injectable()
export class QuestRepository implements QuestAbstractRepository {

  public constructor(
    @InjectRepository(QuestEntity)
    private readonly questRepository: Repository<QuestEntity>
  ){}

  public async create(data: ICreateQuest):Promise<IQuest> {
    const createdEntity = this.questRepository.create(data);

    if(!createdEntity){
      throw new Error('Failed to create new Quest');
    }

    return this.questRepository.save(createdEntity);
  }

  public async findMany(data: IFindMany):Promise<IQuest[]>{
    return this.questRepository.findBy({
      ...data
    })
  }

  public async findOne(questId: string):Promise<IQuest | null>{
    return this.questRepository.findOne({
      where: {
        id: questId
      }
    })
  }

  public async updateOne(questId: string, data: IUpdateQuest):Promise<IQuest>{

    const updatedResult = await this.questRepository.update(questId, data);

    if(!updatedResult.affected){
      throw new Error(`Can't update quest with id: ${questId}`)
    }

    return this.questRepository.findOneByOrFail({
      id: questId
    })
  }

  public async deleteOne(questId: string):Promise<string>{
    const deletedQuest = await this.questRepository.delete({
      id: questId
    })

    if(!deletedQuest.affected){
      throw new Error(`Can't delete quest with id: ${questId}`);
    }

    return questId;
  }

  public async deleteMany(questsIds: string[]):Promise<string[]>{

    const deletedQuests = await this.questRepository.delete(questsIds);

    if(!deletedQuests.affected || deletedQuests.affected !== questsIds.length){
      throw new Error("Can't deleted quests")
    }

    return questsIds;
  }
}
