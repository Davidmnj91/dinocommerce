import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class SendUserAccountClosedConfirmationEmailCommand extends Command<void> {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  constructor({ email, username }: OwnCommandProps<SendUserAccountClosedConfirmationEmailCommand>) {
    super();
    this.email = email;
    this.username = username;
  }
}
