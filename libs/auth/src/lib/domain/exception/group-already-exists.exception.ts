import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const GROUP_ALREADY_EXISTS_EXCEPTION_MESSAGE = 'Group %s is already created';
export class GroupAlreadyExistsException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(GROUP_ALREADY_EXISTS_EXCEPTION_MESSAGE, params));
  }
}
