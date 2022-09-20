import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from 'apps/api/src/app/shared/auth/auth.strategies';
import { AuthenticatedUser, CurrentUser } from '../../../../../shared/auth/current-user.injector';
import { ChangeEmailSubscriptionCommand } from '../../../../app/commands/change-email-subscription/change-email.subscription.command';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiTags('Users')
@Controller({ path: 'users/unsubscribe' })
export class UnsubscribeUserController {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'Unsubscribe from email advertisements campaigns',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async unsubscribe(@CurrentUser() user: AuthenticatedUser) {
    return await this.commandBus.execute(new ChangeEmailSubscriptionCommand(user.id, false));
  }
}
