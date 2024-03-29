import { plainToInstance } from 'class-transformer';

import {
  AuthenticatedUser,
  CurrentUser,
  PassportAuthGuard,
} from '@dinocommerce/shared';
import { UserProfileApi } from '@dinocommerce/warehouse-api';
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

import { UserProfileQuery } from '../../../../app/queries/user-profile/user-profile.query';
import { UserProfileViewModel } from './user-profile.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Users')
@Controller({ path: 'users/profile' })
export class UserProfileController implements UserProfileApi {
  constructor(private queryBus: QueryBus) {}

  @ApiResponse({
    status: 200,
    description: 'The current user profile',
    type: UserProfileViewModel,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const queryModel = await this.queryBus.execute(new UserProfileQuery({ userId: user.id }));

    return plainToInstance(UserProfileViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
