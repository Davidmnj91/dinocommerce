import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const OPERATOR_NOT_FOUND_EXCEPTION = 'Operator %s cannot be found in our system';
export class OperatorNotFoundException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(OPERATOR_NOT_FOUND_EXCEPTION, ...params));
  }
}
