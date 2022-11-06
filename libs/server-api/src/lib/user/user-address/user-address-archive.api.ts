import { UserAddressModel } from './user-address.model';

export type UserAddressArchiveApi = {
  archiveUserAddress: (userAddressId: string, req?: unknown) => Promise<ArchiveUserAddressResponse>;
};

export type ArchiveUserAddressResponse = UserAddressModel['id'];
