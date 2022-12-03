import { UpdateOperatorGroupApi } from '@dinocommerce/auth-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateGroupCommand } from '../../../../../../app/commands/operator/group-update/update-group.command';
import {
  OperatorAuthGuard,
  Permissions,
} from '../../../../../../shared';
import { UpdateGroupRequestModel } from './update-group.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ OPERATOR_GROUP: ['UPDATE'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Operators')
@Controller('operators/groups')
export class UpdateGroupController implements UpdateOperatorGroupApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update an existing Group' })
  @ApiResponse({
    status: 200,
    description: 'The updated group id',
    type: String,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateGroup(@Param('id') groupId: string, @Body() group: UpdateGroupRequestModel) {
    const { name, permissions } = group;

    const { id } = await this.commandBus.execute(new UpdateGroupCommand({ id: groupId, name, permissions }));
    return id;
  }
}
