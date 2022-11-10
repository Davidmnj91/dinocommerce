import { UserAddressModel } from './user-address.model';

export type UserAddressCreateApi = {
  createUserAddress: (body: CreateUserAddressRequest, req?: unknown) => Promise<CreateUserAddressResponse>;
};

export type CreateUserAddressRequest = {
  addressLine: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
};

export type CreateUserAddressResponse = UserAddressModel['id'];
