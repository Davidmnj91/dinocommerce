import { IsNotEmpty } from 'class-validator';
import { AuthType } from './common/auth-types';

export class UserRegisteredEvent {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly authType: AuthType;

  constructor(email: string, username: string, authType: AuthType) {
    this.email = email;
    this.username = username;
    this.authType = authType;
  }
}
