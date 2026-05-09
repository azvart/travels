import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserGrpcController {
  public constructor(private readonly userService: UserService) {}

  @GrpcMethod('Account', 'updateUser')
  public async updateUser(data: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  }) {
    return this.userService.updateUser(data.id, {
      lastName: data.lastName,
      age: data.age,
      firstName: data.firstName,
    });
  }

  @GrpcMethod('Account', 'updateUserAddress')
  public async updateUserAddress(data: {
    id: string;
    country?: string;
    countryCode?: string;
    street?: string;
    city?: string;
  }) {
    console.log('DATA', data);
    return this.userService.updateUserAddress(data.id, {
      country: data.country,
      countryCode: data.countryCode,
      street: data.street,
      city: data.city,
    });
  }
}
