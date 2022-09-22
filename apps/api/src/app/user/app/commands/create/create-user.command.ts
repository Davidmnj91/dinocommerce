import { AuthType, Roles } from '@dinocommerce/events';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';
import { User } from '../../../domain/user.entity';

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

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string,
    authType: AuthType,
    role: Roles,
    profilePictureUrl?: string
  ) {
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
