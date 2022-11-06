import { plainToInstance } from 'class-transformer';

import { UserProfileApi } from '@dinocommerce/server-api';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../../../auth/domain/auth-user';
import { CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { UserDetailsQuery } from '../../../../app/queries/user-details/user-details.query';
import { UserProfileViewModel } from './profile.dto';

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
  async getProfile(@CurrentUser() user: AuthUser) {
    const queryModel = await this.queryBus.execute(new UserDetailsQuery({ userIdOrEmail: user.userId }));

    return plainToInstance(UserProfileViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
