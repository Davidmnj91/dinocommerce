import { IsEmail, IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class RegisterEmailCommand extends Command<void> {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly username: string;

  constructor(email: string, password: string, username: string) {
    super();
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
