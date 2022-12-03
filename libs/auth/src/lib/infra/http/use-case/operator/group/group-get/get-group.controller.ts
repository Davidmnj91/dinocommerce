import { plainToInstance } from 'class-transformer';

import { GetOperatorGroupApi } from '@dinocommerce/auth-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

import { GetGroupQuery } from '../../../../../../app/queries/group-get/get-group.query';
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
export class GetGroupController implements GetOperatorGroupApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get and existing Group' })
  @ApiResponse({
    status: 200,
    description: 'The requested group',
    type: GroupViewModel,
  })
  @Get(':id') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async getGroup(@Param('id') groupId: string): Promise<GroupViewModel> {
    const queryModel = await this.queryBus.execute(new GetGroupQuery({ id: groupId }));
    return plainToInstance(GroupViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
