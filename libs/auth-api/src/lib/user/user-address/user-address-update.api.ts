import { UserAddressModel } from './user-address.model';

export type UserAddressUpdateApi = {
  updateUserAddress: (
    id: UserAddressModel['id'],
    body: UpdateUserAddressRequest,
    req?: unknown
  ) => Promise<UpdateUserAddressResponse>;
};

export type UpdateUserAddressRequest = {
  addressLine: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
};

export type UpdateUserAddressResponse = UserAddressModel['id'];
