import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { UserAlreadyRegisteredException } from '../../auth/domain/exception/user-already-registered.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { User } from './user.entity';

@Injectable()
export class UserDomainService {
  constructor(@InjectRepository(User) private userRepository: EntityRepository<User>) {}

  async findUserByUserId(userIdOrEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({ $or: [{ email: userIdOrEmail }, { userId: userIdOrEmail }] });

    if (!user) {
      throw new UserNotFoundException(userIdOrEmail);
    }
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async checkUserNotExists(email: string) {
    const exists = await this.userRepository.findOne({ email });
    if (exists) {
      throw new UserAlreadyRegisteredException(email);
    }
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.persistAndFlush(user);
  }
}
