import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from './user.abstract.repository';
import { IGetUser, IUpdateUserInputInterface, IUser } from 'libs/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';


@Injectable()
export class UserRepository implements UserAbstractRepository{

  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  public async updateUser(userId: string,data:Omit<IUpdateUserInputInterface, 'id'>){
    const updatedUser = await this.userRepository.update(userId, data);
    if(!updatedUser.affected) {
      throw new Error(`Can't update user with id: ${userId}`);
    }

    return this.userRepository.findOneOrFail({
      where: {
        id: userId,
      },
      relations: {
        account: true
      }
    })
  }


  public async createUser(accountId: string){
    return this.userRepository.save(
      this.userRepository.create({
        account: {
          id: accountId,
        }
      })
    )
  }

  public async getUser(data: IGetUser){
    return this.userRepository.findOneOrFail({
      where: {
        id: data.userId,
        account: {
          id: data.accountId,
          email: data.email
        }
      },
      relations: {
        account: true
      }
    })
  }


  public async findByAccountId(accountId: string){
      return this.userRepository.findOneOrFail({
        where: {
          account: {
            id: accountId
          }
        },
        relations: {
          account: true
        }
      })
  }
}
