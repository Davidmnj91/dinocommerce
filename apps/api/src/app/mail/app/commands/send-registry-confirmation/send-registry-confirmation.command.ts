import { IsNotEmpty } from 'class-validator';

export class SendRegistryConfirmationEmailCommand {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly username: string;

  constructor(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
  }
}
