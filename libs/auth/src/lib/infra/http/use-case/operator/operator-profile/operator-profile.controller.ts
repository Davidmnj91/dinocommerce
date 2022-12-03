import { plainToInstance } from 'class-transformer';

import { OperatorProfileApi } from '@dinocommerce/auth-api';
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OperatorProfileQuery } from '../../../../../app/queries/operator-profile/operator-profile.query';
import {
  AuthenticatedUser,
  CurrentUser,
  OperatorAuthGuard,
  Permissions,
} from '../../../../../shared';
import { OperatorProfileViewModel } from './operator-profile.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ OPERATOR: ['VIEW'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Operators')
@Controller({ path: 'operators/profile' })
export class OperatorProfileController implements OperatorProfileApi {
  constructor(private queryBus: QueryBus) {}

  @ApiResponse({
    status: 200,
    description: 'The current operator profile',
    type: OperatorProfileViewModel,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const queryModel = await this.queryBus.execute(new OperatorProfileQuery({ operatorId: user.id }));

    return plainToInstance(OperatorProfileViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
