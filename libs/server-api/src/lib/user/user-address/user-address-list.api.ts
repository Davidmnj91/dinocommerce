import { UserAddressModel } from './user-address.model';

export type UserAddressListApi = {
  listUserAddress: (user?: unknown) => Promise<UserAddressResponse>;
};

export type UserAddressResponse = UserAddressModel[];
