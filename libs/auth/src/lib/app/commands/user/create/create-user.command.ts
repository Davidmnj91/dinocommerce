import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import {
  AuthType,
  Roles,
} from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

import { User } from '../../../../domain/user/user.entity';

export class CreateUserCommand extends Command<User> {
  readonly userId: string;

  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  readonly password: string;

  @IsNotEmpty()
  readonly authType: AuthType;

  @IsNotEmpty()
  readonly role: Roles;

  readonly profilePictureUrl?: string;

  constructor({
    userId,
    username,
    email,
    password,
    authType,
    role,
    profilePictureUrl,
  }: OwnCommandProps<CreateUserCommand>) {
    super();
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authType = authType;
    this.role = role;
    this.profilePictureUrl = profilePictureUrl;
  }
}
