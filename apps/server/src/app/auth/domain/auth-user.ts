import { AuthType, Roles } from '@dinocommerce/events';

export class AuthUser {
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly authType: AuthType;
  readonly role: Roles;
  readonly profilePictureUrl?: string;

  constructor(
    id: string,
    userId: string,
    username: string,
    email: string,
    password: string,
    authType: AuthType,
    role: Roles,
    profilePictureUrl?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authType = authType;
    this.role = role;
    this.profilePictureUrl = profilePictureUrl;
  }
}
