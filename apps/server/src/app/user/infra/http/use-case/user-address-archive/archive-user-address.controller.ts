import { UserAddressArchiveApi } from '@dinocommerce/server-api';
import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { ArchiveUserAddressCommand } from '../../../../app/commands/user-address-archive/archive-user-address.command';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Users')
@Controller({ path: 'users/address' })
export class UserAddressArchiveController implements UserAddressArchiveApi {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'The archived user address',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async archiveUserAddress(@Param('id') userAddressId: string, @CurrentUser() user: AuthenticatedUser) {
    const { userAddressId: id } = await this.commandBus.execute(
      new ArchiveUserAddressCommand({ userId: user.id, userAddressId })
    );

    return id;
  }
}
