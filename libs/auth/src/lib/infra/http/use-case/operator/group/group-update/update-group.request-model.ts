import { IsNotEmpty } from 'class-validator';

import { UpdateOperatorGroupRequest } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

import { ApplicationPermissions } from '../../../../../../domain/operator/application_permission';

export class UpdateGroupRequestModel implements UpdateOperatorGroupRequest {
  @ApiProperty({ example: 'OFFICERS' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: { OPERATOR: ['CREATE'] } })
  permissions: Partial<ApplicationPermissions>;
}
