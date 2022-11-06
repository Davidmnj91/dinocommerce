import { UserAddressCreateApi } from '@dinocommerce/server-api';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../../../auth/domain/auth-user';
import { CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { CreateUserAddressCommand } from '../../../../app/commands/user-address-create/create-user-address.command';
import { CreateUserAddressRequestModel } from './create-user-address.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Users')
@Controller({ path: 'users/address' })
export class UserAddressCreateController implements UserAddressCreateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiResponse({
    status: 200,
    description: 'The created user address id',
    type: String,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createUserAddress(@Body() userAddress: CreateUserAddressRequestModel, @CurrentUser() user: AuthUser) {
    const { addressLine, city, province, zipCode, country } = userAddress;
    const { userAddressId } = await this.commandBus.execute(
      new CreateUserAddressCommand({ userId: user.id, addressLine, city, province, zipCode, country })
    );

    return userAddressId;
  }
}
