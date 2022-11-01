import { format } from 'util';
import { DomainException } from '../../../shared/exception/domain.exception';

export const USER_ALREADY_DELETED_EXCEPTION = 'User %s is already deleted';

export class UserAlreadyDeletedException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(USER_ALREADY_DELETED_EXCEPTION, ...params));
  }
}
