import { Controller, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { UserDetailsQuery } from '../../../../app/queries/details/user-details.query';
import { UserProfileDto } from './profile.dto';

@ApiBearerAuth()
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
  async getProfile(@Request() req) {
    const { userName, email, phone } = await this.queryBus.execute(new UserDetailsQuery(req.user.id));

    return new UserProfileDto(userName, email, phone);
  }
}
