import { format } from 'util';

import { DomainException } from '../../../shared/exception/domain.exception';

export const USER_ADDRESS_ALREADY_ARCHIVED_EXCEPTION = 'User address %s is already deleted';

export class UserAddressAlreadyArchivedException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(USER_ADDRESS_ALREADY_ARCHIVED_EXCEPTION, ...params));
  }
}
