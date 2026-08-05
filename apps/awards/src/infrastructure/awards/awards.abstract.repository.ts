import { IAwards, ICreateAward, IUpdateAward } from 'libs/interfaces/awards';

export abstract class AwardsAbstractRepository {
  abstract createAward(data: ICreateAward): Promise<IAwards>;
  abstract updateAward(data: IUpdateAward): Promise<IAwards>;
  abstract deleteAward(id: string): Promise<IAwards>;
  abstract findManyAwards(): Promise<IAwards[]>;
  abstract findOneAward(id: string): Promise<IAwards>;
}
