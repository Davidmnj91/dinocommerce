import { UserAddressUpdateApi } from '@dinocommerce/server-api';
import {
  AuthenticatedUser,
  CurrentUser,
  PassportAuthGuard,
} from '@dinocommerce/shared';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateUserAddressCommand } from '../../../../app/commands/user-address-update/update-user-address.command';
import { UpdateUserAddressRequestModel } from './update-user-address.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Users')
@Controller({ path: 'users/address' })
export class UserAddressUpdateController implements UserAddressUpdateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'The updated user address id',
    type: String,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserAddress(
    @Param('id') userAddressId: string,
    @Body() userAddress: UpdateUserAddressRequestModel,
    @CurrentUser() user: AuthenticatedUser
  ) {
    const { addressLine, city, province, zipCode, country } = userAddress;
    const { userAddressId: id } = await this.commandBus.execute(
      new UpdateUserAddressCommand({ userId: user.id, userAddressId, addressLine, city, province, zipCode, country })
    );

    return id;
  }
}
