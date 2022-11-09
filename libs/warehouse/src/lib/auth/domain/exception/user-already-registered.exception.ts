import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const USER_ALREADY_REGISTERED_EXCEPTION_MESSAGE = 'User %s is already registered';
export class UserAlreadyRegisteredException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(USER_ALREADY_REGISTERED_EXCEPTION_MESSAGE, params));
  }
}
