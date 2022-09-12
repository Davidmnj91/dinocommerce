import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlreadyRegisteredException } from '../../auth/domain/exception/user-already-registered.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async checkUserNotExists(email: string) {
    const exists = await this.userRepository.findOneBy({ email });
    if (exists) {
      throw new UserAlreadyRegisteredException();
    }
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
