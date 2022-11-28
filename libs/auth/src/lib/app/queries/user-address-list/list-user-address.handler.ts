import { plainToInstance } from 'class-transformer';

import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { UserAddressDomainService } from '../../../domain/user/user-address.service';
import { UserAddressQueryModel } from '../common/models/user-address.query-model';
import { ListUserAddressQuery } from './list-user-address.query';

@QueryHandler(ListUserAddressQuery)
export class ListUserAddressesQueryHandler implements IInferredQueryHandler<ListUserAddressQuery> {
  constructor(private domainService: UserAddressDomainService) {}

  async execute(query: ListUserAddressQuery): Promise<UserAddressQueryModel[]> {
    const { userId } = query;

    const userAddressList = await this.domainService.findAllByUserId(userId);

    return plainToInstance(UserAddressQueryModel, userAddressList, { excludeExtraneousValues: true });
  }
}
