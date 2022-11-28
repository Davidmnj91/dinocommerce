import { Expose } from 'class-transformer';

import { ApplicationPermissions } from '../../../../domain/operator/application_permission';

export class GroupQueryModel {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly permissions: Partial<ApplicationPermissions>;

  constructor(id: string, name: string, permissions: Partial<ApplicationPermissions>) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
