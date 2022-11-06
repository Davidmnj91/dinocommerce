import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { UserAddressNotFoundException } from './exception/user-address-not-found.exception';
import { UserAddress } from './user-adress.entity';

@Injectable()
export class UserAddressDomainService {
  constructor(@InjectRepository(UserAddress) private userAddressRepository: EntityRepository<UserAddress>) {}

  async findAllByUserId(userId: string): Promise<UserAddress[]> {
    return this.userAddressRepository.find({ user: { id: userId } });
  }

  async findByUserAddressId(userAddressId: string): Promise<UserAddress> {
    const userAddress = await this.userAddressRepository.findOne({ id: userAddressId });

    if (!userAddress) {
      throw new UserAddressNotFoundException(userAddressId);
    }
    return userAddress;
  }

  async findByUserIdAndUserAddressId(userId: string, userAddressId: string): Promise<UserAddress> {
    const userAddress = await this.userAddressRepository.findOne({ id: userAddressId, user: { id: userId } });

    if (!userAddress) {
      throw new UserAddressNotFoundException(userAddressId);
    }
    return userAddress;
  }

  async createUserAddress(userAddress: UserAddress): Promise<UserAddress> {
    const createdUserAddress = this.userAddressRepository.create(userAddress);
    await this.userAddressRepository.persistAndFlush(createdUserAddress);

    return createdUserAddress;
  }

  async updateUserAddress(
    existingUserAddress: UserAddress,
    updatedUserAddress: Partial<UserAddress>
  ): Promise<UserAddress> {
    const result = wrap(existingUserAddress).assign(updatedUserAddress);
    await this.userAddressRepository.persistAndFlush(result);

    return result;
  }

  async saveUserAddress(userAddress: UserAddress): Promise<void> {
    await this.userAddressRepository.persistAndFlush(userAddress);
  }
}
