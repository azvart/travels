import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserQuestDto } from './dto';
import { CurrentUser } from '@app/auth';
import { IGetUser } from 'libs/interfaces';
import { QuestsPresentationService } from './quests-presentation.service';

@Resolver(() => UserQuestDto)
export class UserQuestPresentationResolver {
  public constructor(private readonly questPresentationService: QuestsPresentationService) {}

  @ResolveField()
  public async questEntity(@Parent() userQuest: UserQuestDto, @CurrentUser() user: IGetUser) {
    return this.questPresentationService.findOneQuest(userQuest.questId);
  }
}
