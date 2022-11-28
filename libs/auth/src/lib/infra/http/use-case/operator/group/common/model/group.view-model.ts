import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { ApplicationPermissions } from '../../../../../../../domain/operator/application_permission';

export class GroupViewModel {
  @Expose()
  @ApiProperty({ example: '729314b8-0d6a-48f0-bb8d-48175edc87b5' })
  readonly id: string;
  @Expose()
  @ApiProperty({ example: 'MANAGERS' })
  readonly name: string;
  @Expose()
  @ApiProperty()
  permissions: Partial<ApplicationPermissions>;

  constructor(id: string, name: string, permissions: Partial<ApplicationPermissions>) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
