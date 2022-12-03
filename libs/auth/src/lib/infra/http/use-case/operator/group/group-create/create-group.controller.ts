import { CreateOperatorGroupApi } from '@dinocommerce/auth-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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

import { CreateGroupCommand } from '../../../../../../app/commands/operator/group-create/create-group.command';
import {
  OperatorAuthGuard,
  Permissions,
} from '../../../../../../shared';
import { CreateGroupRequestModel } from './create-group.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ OPERATOR_GROUP: ['CREATE'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Operators')
@Controller('operators/groups')
export class CreateGroupController implements CreateOperatorGroupApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Group' })
  @ApiResponse({
    status: 200,
    description: 'The created group id',
    type: String,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createGroup(@Body() group: CreateGroupRequestModel) {
    const { name, permissions } = group;

    const { id } = await this.commandBus.execute(new CreateGroupCommand({ name, permissions }));
    return id;
  }
}
