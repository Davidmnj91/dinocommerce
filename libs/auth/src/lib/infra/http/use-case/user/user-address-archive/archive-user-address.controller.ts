import { UserAddressArchiveApi } from '@dinocommerce/auth-api';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ArchiveUserAddressCommand,
} from '../../../../../app/commands/user/user-address-archive/archive-user-address.command';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../../../../shared';

@ApiBearerAuth()
@ApiCookieAuth()
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
