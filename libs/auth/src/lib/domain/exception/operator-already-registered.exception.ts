import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const OPERATOR_ALREADY_REGISTERED_EXCEPTION_MESSAGE = 'Operator %s is already registered';
export class OperatorAlreadyRegisteredException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(OPERATOR_ALREADY_REGISTERED_EXCEPTION_MESSAGE, params));
  }
}
