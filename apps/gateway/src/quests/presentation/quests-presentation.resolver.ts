import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { QuestsPresentationService } from './quests-presentation.service';
import {
  CreateQuestDto,
  DeleteOneQuestInputDto,
  FindManyQuestsDto,
  FindOneQuestDto,
  QuestDto,
  UpdateQuestDto,
  DeleteManyQuestsInputDto,
  DeleteManyQuestsOutputDto,
  UserQuestDto,
  AttachQuestToUserDto,
  FindManyUserQuestDto,
} from './dto';
import { DeleteOneQuestOutputDto } from './dto/delete-one-quest.output.dto';
import { CurrentUser } from '@app/auth';
import { IGetUser } from 'libs/interfaces';

@Resolver(() => QuestDto)
export class QuestsPresentationResolver {
  public constructor(private readonly questsPresentationService: QuestsPresentationService) {}

  @Mutation(() => QuestDto)
  public async createQuest(@Args('input') data: CreateQuestDto) {
    return this.questsPresentationService.createQuest(data);
  }

  @Mutation(() => QuestDto)
  public async updateQuest(@Args('input') data: UpdateQuestDto) {
    return this.questsPresentationService.updateQuest(data);
  }

  @Query(() => QuestDto)
  public async findOneQuest(@Args('input') data: FindOneQuestDto) {
    return this.questsPresentationService.findOneQuest(data.id);
  }

  @Query(() => [QuestDto])
  public async findManyQuests(@Args('input') data: FindManyQuestsDto) {
    return this.questsPresentationService.findManyQuests(data);
  }

  @Mutation(() => DeleteOneQuestOutputDto)
  public async deleteOneQuest(@Args('input') data: DeleteOneQuestInputDto) {
    return this.questsPresentationService.deleteOneQuest(data);
  }

  @Mutation(() => DeleteManyQuestsOutputDto)
  public async deleteManyQuests(@Args('input') data: DeleteManyQuestsInputDto) {
    return this.questsPresentationService.deleteManyQuests(data.id);
  }

  @Mutation(() => UserQuestDto)
  public async attacheQuestToUser(
    @Args('input') data: AttachQuestToUserDto,
    @CurrentUser() user: IGetUser,
  ) {
    return this.questsPresentationService.attachQuestToUser(data, user);
  }

  @Query(() => UserQuestDto)
  public async findOneUserQuest(@Args('questId') questId: string, @CurrentUser() user: IGetUser) {
    return this.questsPresentationService.findOneUserQuest(user.userId, questId);
  }

  @Query(() => [UserQuestDto])
  public async findManyUserQuests(
    @Args('input') data: FindManyUserQuestDto,
    @CurrentUser() user: IGetUser,
  ) {
    return this.questsPresentationService.findManyUserQuests(user.userId, data);
  }

  @ResolveField()
  public async attached(@Parent() quest: QuestDto, @CurrentUser() user: IGetUser) {
    return this.questsPresentationService.attachedQuests(quest.id, user.userId);
  }
}
