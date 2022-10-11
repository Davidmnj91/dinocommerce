import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UserAlreadyRegisteredException } from '../../auth/domain/exception/user-already-registered.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepository: EntityRepository<User>) {}

  async findUserById(userId: string): Promise<User> {
    let user;

    try {
      user = await this.userRepository.findOne({ $or: [{ email: userId }, { userId }] });
    } catch (error) {
      this.logger.error(error);
    }
    if (!user) {
      throw new UserNotFoundException(userId);
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
