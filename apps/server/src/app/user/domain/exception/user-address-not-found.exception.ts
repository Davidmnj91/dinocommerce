import { format } from 'util';

import { DomainException } from '../../../shared/exception/domain.exception';

export const USER_ADDRESS_NOT_FOUND_EXCEPTION = 'User address %s cannot be found in our system';
export class UserAddressNotFoundException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(USER_ADDRESS_NOT_FOUND_EXCEPTION, ...params));
  }
}
