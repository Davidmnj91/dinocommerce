import { IsNotEmpty } from 'class-validator';

import { CreateOperatorGroupRequest } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

import { ApplicationPermissions } from '../../../../../../domain/operator/application_permission';

export class CreateGroupRequestModel implements CreateOperatorGroupRequest {
  @ApiProperty({ example: 'OFFICERS' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: { OPERATOR: ['CREATE'] } })
  permissions: Partial<ApplicationPermissions>;
}
