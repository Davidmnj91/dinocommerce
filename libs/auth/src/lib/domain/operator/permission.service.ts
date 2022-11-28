import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Permission } from './permission';

@Injectable()
export class PermissionDomainService {
  constructor(@InjectRepository(Permission) private permissionRepository: EntityRepository<Permission>) {}

  async createPermission(permission: Permission): Promise<Permission> {
    const created = await this.permissionRepository.create(permission);
    await this.permissionRepository.persistAndFlush(created);

    return created;
  }

  async updatePermission(permission: Permission): Promise<Permission> {
    await this.permissionRepository.persistAndFlush(permission);

    return permission;
  }

  async deletePermissions(permission: Partial<Permission>) {
    await this.permissionRepository.removeAndFlush(permission);
  }
}
