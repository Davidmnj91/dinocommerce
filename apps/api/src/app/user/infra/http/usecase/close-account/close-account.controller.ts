import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { CloseUserAccountCommand } from '../../../../app/commands/close-account/close-account.command';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
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
