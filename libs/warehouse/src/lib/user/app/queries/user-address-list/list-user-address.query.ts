import { IsNotEmpty } from 'class-validator';

import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { UserAddressQueryModel } from '../common/models/user-address.query-model';

export class ListUserAddressQuery extends Query<UserAddressQueryModel[]> {
  @IsNotEmpty()
  readonly userId: string;

  constructor({ userId }: OwnQueryProps<ListUserAddressQuery>) {
    super();
    this.userId = userId;
  }
}
