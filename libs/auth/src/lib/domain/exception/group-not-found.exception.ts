import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const GROUP_NOT_FOUND_EXCEPTION = 'Group %s cannot be found in our system';
export class GroupNotFoundException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(GROUP_NOT_FOUND_EXCEPTION, ...params));
  }
}
