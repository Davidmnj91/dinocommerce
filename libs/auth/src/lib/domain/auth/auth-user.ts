import { AuthType } from '@dinocommerce/events';

export class AuthUser {
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly authType: AuthType;
  readonly profilePictureUrl?: string;

  constructor(
    id: string,
    userId: string,
    username: string,
    email: string,
    password: string,
    authType: AuthType,
    profilePictureUrl?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authType = authType;
    this.profilePictureUrl = profilePictureUrl;
  }
}
