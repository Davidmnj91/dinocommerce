import { AuthType, Roles } from '@dinocommerce/events';

export class UserDetailsDto {
  readonly userId: string;

  readonly username: string;

  readonly email: string;

  readonly phone: string;

  readonly password: string;

  readonly authType: AuthType;

  readonly role: Roles;

  readonly profilePictureUrl?: string;

  constructor(
    userId: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    authType: AuthType,
    role: Roles,
    profilePictureUrl?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.authType = authType;
    this.role = role;
    this.profilePictureUrl = profilePictureUrl;
  }
}
