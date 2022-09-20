import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { AuthenticatedUser, CurrentUser } from '../../../../../shared/auth/current-user.injector';
import { UserDetailsQuery } from '../../../../app/queries/details/user-details.query';
import { UserProfileDto } from './profile.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiTags('Users')
@Controller({ path: 'users/profile' })
export class UserProfileController {
  constructor(private queryBus: QueryBus) {}

  @ApiResponse({
    status: 200,
    description: 'The current user profile',
    type: UserProfileDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const { username, email, phone, profilePictureUrl } = await this.queryBus.execute(new UserDetailsQuery(user.id));

    return new UserProfileDto(username, email, phone, profilePictureUrl);
  }
}
