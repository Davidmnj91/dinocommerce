import { plainToInstance } from 'class-transformer';

import { UserAddressListApi } from '@dinocommerce/auth-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ListUserAddressQuery } from '../../../../../app/queries/user-address-list/list-user-address.query';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../../../../shared';
import { UserAddressViewModel } from '../common/models/user-address.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Users')
@Controller({ path: 'users/address' })
export class UserAddressListController implements UserAddressListApi {
  constructor(private queryBus: QueryBus) {}

  @ApiResponse({
    status: 200,
    description: 'The user address belonging to the current user',
    type: Array<UserAddressViewModel>,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async listUserAddress(@CurrentUser() user: AuthenticatedUser) {
    const queryModel = await this.queryBus.execute(new ListUserAddressQuery({ userId: user.id }));

    return plainToInstance(UserAddressViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
