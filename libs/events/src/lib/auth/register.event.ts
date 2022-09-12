import { IsNotEmpty } from 'class-validator';
import { AuthType } from './common/auth-types';

export class UserRegisteredEvent {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly authType: AuthType;

  constructor(userId: string, username: string, authType: AuthType) {
    this.userId = userId;
    this.username = username;
    this.authType = authType;
  }
}
