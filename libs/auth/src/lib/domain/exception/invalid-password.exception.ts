import { DomainException } from '@dinocommerce/shared';

export const INVALID_PASSWORD_EXCEPTION_MESSAGE = 'Password invalid';
export class InvalidPasswordException extends DomainException {
  constructor(message: string = INVALID_PASSWORD_EXCEPTION_MESSAGE) {
    super(message);
  }
}
