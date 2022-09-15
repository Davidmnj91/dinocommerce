import { AuthType, Roles } from '@petrocommerce/events';

export class AuthUser {
  readonly userId: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly authType: AuthType;
  readonly role: Roles;
  readonly profilePictureUrl?: string;

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string,
    authType: AuthType,
    role: Roles,
    profilePictureUrl?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authType = authType;
    this.role = role;
    this.profilePictureUrl = profilePictureUrl;
  }
}
