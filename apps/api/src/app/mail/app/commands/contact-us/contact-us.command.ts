import { Command } from 'apps/api/src/app/shared/cqrs';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactUsCommand extends Command<void> {
  @IsEmail()
  readonly clientEmail: string;

  @IsNotEmpty()
  readonly clientName: string;

  @IsNotEmpty()
  readonly messageTitle: string;

  @IsNotEmpty()
  readonly messageBody: string;

  constructor(clientEmail: string, clientName: string, messageTitle: string, messageBody: string) {
    super();
    this.clientEmail = clientEmail;
    this.clientName = clientName;
    this.messageTitle = messageTitle;
    this.messageBody = messageBody;
  }
}
