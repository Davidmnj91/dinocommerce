import { plainToInstance } from 'class-transformer';

import {
  AuthenticatedUser,
  CurrentUser,
  PassportAuthGuard,
} from '@dinocommerce/shared';
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
import { OperatorProfileViewModel } from './operator-profile.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Operators')
@Controller({ path: 'operators/profile' })
export class OperatorProfileController {
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
