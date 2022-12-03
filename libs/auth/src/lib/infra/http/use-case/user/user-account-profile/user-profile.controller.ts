import { plainToInstance } from 'class-transformer';

import { UserProfileApi } from '@dinocommerce/auth-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserProfileQuery } from '../../../../../app/queries/user-profile/user-profile.query';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../../../../shared';
import { UserProfileViewModel } from './user-profile.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
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
