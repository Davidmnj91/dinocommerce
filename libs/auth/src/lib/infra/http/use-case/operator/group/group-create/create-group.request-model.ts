import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ApplicationPermissions } from '../../../../../../domain/operator/application_permission';

export class CreateGroupRequestModel {
  @ApiProperty({ example: 'OFFICERS' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: { OPERATOR: ['CREATE'] } })
  permissions: Partial<ApplicationPermissions>;
}
