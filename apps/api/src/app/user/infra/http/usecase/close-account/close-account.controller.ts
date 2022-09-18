import { Controller, Delete, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from 'apps/api/src/app/shared/auth/auth.strategies';
import { CloseUserAccountCommand } from '../../../../app/commands/close-account/close-account.command';

@ApiBearerAuth()
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
  async closeUserAccount(@Request() req) {
    return await this.commandBus.execute(new CloseUserAccountCommand(req.user.id));
  }
}
