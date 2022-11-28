import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { GroupAlreadyExistsException } from '../exception/group-already-exists.exception';
import { GroupNotFoundException } from '../exception/group-not-found.exception';
import { Group } from './group';

@Injectable()
export class GroupDomainService {
  constructor(@InjectRepository(Group) private groupRepository: EntityRepository<Group>) {}

  async findAllGroups(): Promise<Group[]> {
    return await this.groupRepository.findAll();
  }

  async findGroupsById(groupIds: string[]): Promise<Group[]> {
    return await this.groupRepository.find({ id: { $in: groupIds } });
  }

  async findGroupById(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ id });

    if (!group) {
      throw new GroupNotFoundException(id);
    }

    return group;
  }

  async assertGroupByName(name: string): Promise<void> {
    const group = await this.groupRepository.count({ name });

    if (group) {
      throw new GroupAlreadyExistsException(name);
    }
  }

  async saveGroup(group: Group): Promise<Group> {
    const createdProduct = await this.groupRepository.create(group);
    await this.groupRepository.persistAndFlush(createdProduct);

    return createdProduct;
  }

  async updateGroup(existingGroup: Group, updatedGroup: Partial<Group>): Promise<Group> {
    const result = wrap(existingGroup).assign(updatedGroup);
    await this.groupRepository.persistAndFlush(result);

    return result;
  }
}
