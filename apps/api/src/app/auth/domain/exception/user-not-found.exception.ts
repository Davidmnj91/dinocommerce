import { format } from 'util';
import { DomainException } from '../../../shared/exception/domain.exception';

export const USER_NOT_FOUND_EXCEPTION = 'User %s cannot be found in our system';
export class UserNotFoundException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(USER_NOT_FOUND_EXCEPTION, ...params));
  }
}
