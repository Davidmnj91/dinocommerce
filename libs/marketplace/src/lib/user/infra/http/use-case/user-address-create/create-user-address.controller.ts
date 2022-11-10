import {
  AuthenticatedUser,
  CurrentUser,
  PassportAuthGuard,
} from '@dinocommerce/shared';
import { UserAddressCreateApi } from '@dinocommerce/warehouse-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  async createUserAddress(@Body() userAddress: CreateUserAddressRequestModel, @CurrentUser() user: AuthenticatedUser) {
    const { addressLine, city, province, zipCode, country } = userAddress;
    const { userAddressId } = await this.commandBus.execute(
      new CreateUserAddressCommand({ userId: user.id, addressLine, city, province, zipCode, country })
    );

    return userAddressId;
  }
}
