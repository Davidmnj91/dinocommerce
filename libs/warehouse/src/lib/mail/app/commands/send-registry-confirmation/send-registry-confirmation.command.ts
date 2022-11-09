import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

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
