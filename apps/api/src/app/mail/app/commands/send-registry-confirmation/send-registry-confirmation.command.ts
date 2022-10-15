import { IsEmail, IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

export class SendRegistryConfirmationEmailCommand extends Command<void> {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  constructor({ email, username }: OwnCommandProps<SendRegistryConfirmationEmailCommand>) {
    super();
    this.email = email;
    this.username = username;
  }
}
