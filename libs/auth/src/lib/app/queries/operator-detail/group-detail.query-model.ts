import {
  Expose,
  Type,
} from 'class-transformer';

import { PermissionDetailQueryModel } from './permission-detail.query-model';

export class GroupDetailQueryModel {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  @Type(() => Array<PermissionDetailQueryModel>)
  readonly permissions: PermissionDetailQueryModel[];

  constructor(id: string, name: string, permissions: PermissionDetailQueryModel[]) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
