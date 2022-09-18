import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendUserAccountClosedConfirmationEmailCommand {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
  }
}
