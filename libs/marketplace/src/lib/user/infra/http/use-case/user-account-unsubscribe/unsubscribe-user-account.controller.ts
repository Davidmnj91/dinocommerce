import {
  AuthenticatedUser,
  CurrentUser,
  PassportAuthGuard,
} from '@dinocommerce/shared';
import { UserUnsubscribeApi } from '@dinocommerce/warehouse-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ChangeEmailSubscriptionCommand,
} from '../../../../app/commands/change-email-subscription/change-email.subscription.command';

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
  async unsubscribe(@CurrentUser() user: AuthenticatedUser) {
    await this.commandBus.execute(new ChangeEmailSubscriptionCommand({ userId: user.id, subscribe: false }));
  }
}
