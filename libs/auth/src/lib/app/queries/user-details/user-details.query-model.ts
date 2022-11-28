import { Expose } from 'class-transformer';

import {
  AuthType,
  Roles,
} from '@dinocommerce/events';

export class UserDetailsQueryModel {
  @Expose()
  readonly id: string;
  @Expose()
  readonly userId: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly password: string;
  @Expose()
  readonly authType: AuthType;
  @Expose()
  readonly role: Roles;
  @Expose()
  readonly profilePictureUrl?: string;

  constructor(
    id: string,
    userId: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    authType: AuthType,
    role: Roles,
    profilePictureUrl?: string
  ) {
    this.id = id;
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
