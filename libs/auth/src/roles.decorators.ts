import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'libs/interfaces';

export const Roles = Reflector.createDecorator<UserRoleEnum>();
