import { plainToInstance } from 'class-transformer';

import { ListOperatorGroupApi } from '@dinocommerce/auth-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetGroupsQuery } from '../../../../../../app/queries/groups-get/get-groups.query';
import {
  OperatorAuthGuard,
  Permissions,
} from '../../../../../../shared';
import { GroupViewModel } from '../common/model/group.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ OPERATOR_GROUP: ['VIEW'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Operators')
@Controller('operators/groups')
export class ListGroupsController implements ListOperatorGroupApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Groups' })
  @ApiResponse({
    status: 200,
    description: 'The registered groups in the system',
    type: Array<GroupViewModel>,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async listGroups(): Promise<GroupViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetGroupsQuery());
    return plainToInstance(GroupViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
