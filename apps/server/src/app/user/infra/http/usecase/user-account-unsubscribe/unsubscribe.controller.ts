import { UserUnsubscribeApi } from '@dinocommerce/server-api';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../../../auth/domain/auth-user';
import { CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { ChangeEmailSubscriptionCommand } from '../../../../app/commands/change-email-subscription/change-email.subscription.command';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Users')
@Controller({ path: 'users/unsubscribe' })
export class UnsubscribeUserController implements UserUnsubscribeApi {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'Unsubscribe from email advertisements campaigns',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async unsubscribe(@CurrentUser() user: AuthUser) {
    await this.commandBus.execute(new ChangeEmailSubscriptionCommand({ userId: user.id, subscribe: false }));
  }
}
