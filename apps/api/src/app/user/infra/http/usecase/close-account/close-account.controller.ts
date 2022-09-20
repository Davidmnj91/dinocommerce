import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { AuthenticatedUser, CurrentUser } from '../../../../../shared/auth/current-user.injector';
import { CloseUserAccountCommand } from '../../../../app/commands/close-account/close-account.command';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiTags('Users')
@Controller({ path: 'users/close' })
export class CloseUserAccountController {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'User account has been closed successfully',
  })
  @Delete()
  @HttpCode(HttpStatus.OK)
  async closeUserAccount(@CurrentUser() user: AuthenticatedUser) {
    return await this.commandBus.execute(new CloseUserAccountCommand(user.id));
  }
}
