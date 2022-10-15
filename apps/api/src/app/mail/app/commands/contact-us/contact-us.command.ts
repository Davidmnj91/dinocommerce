import { Command } from 'apps/api/src/app/shared/cqrs';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

export class ContactUsCommand extends Command<void> {
  @IsEmail()
  readonly clientEmail: string;

  @IsNotEmpty()
  readonly clientName: string;

  @IsNotEmpty()
  readonly messageTitle: string;

  @IsNotEmpty()
  readonly messageBody: string;

  constructor({ clientEmail, clientName, messageTitle, messageBody }: OwnCommandProps<ContactUsCommand>) {
    super();
    this.clientEmail = clientEmail;
    this.clientName = clientName;
    this.messageTitle = messageTitle;
    this.messageBody = messageBody;
  }
}
