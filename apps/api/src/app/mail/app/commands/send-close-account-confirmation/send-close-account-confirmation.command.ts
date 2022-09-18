import { IsEmail, IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class SendUserAccountClosedConfirmationEmailCommand extends Command<void> {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  constructor(email: string, username: string) {
    super();
    this.email = email;
    this.username = username;
  }
}
