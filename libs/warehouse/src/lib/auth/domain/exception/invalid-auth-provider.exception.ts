import { format } from 'util';

import { DomainException } from '@dinocommerce/shared';

export const INVALID_AUTH_PROVIDER_EXCEPTION_MESSAGE = `User %s is not register by %s`;
export class InvalidAuthProviderException extends DomainException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...params: any[]) {
    super(format(INVALID_AUTH_PROVIDER_EXCEPTION_MESSAGE, ...params));
  }
}
