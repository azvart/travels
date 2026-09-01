import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AwardsDto, CreateAwardInputDto } from './dto';
import { AwardsPresentationService } from './awards.presentation.service';

@Resolver()
export class AwardsPresentationResolver {
  public constructor(private readonly awardsPresentationService: AwardsPresentationService) {}

  @Mutation(() => AwardsDto)
  public async createAward(@Args('input') data: CreateAwardInputDto) {
    return this.awardsPresentationService.createAward(data);
  }
}
