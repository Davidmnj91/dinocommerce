import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class RegisterEmailCommand extends Command<void> {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly username: string;

  constructor({ email, password, username }: OwnCommandProps<RegisterEmailCommand>) {
    super();
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
