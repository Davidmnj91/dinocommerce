import { plainToInstance } from 'class-transformer';

import { UserAddressListApi } from '@dinocommerce/server-api';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser, CurrentUser, PassportAuthGuard } from '../../../../../shared/auth';
import { ListUserAddressQuery } from '../../../../app/queries/user-address-list/list-user-address.query';
import { UserAddressViewModel } from '../../common/models/user-address.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
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
