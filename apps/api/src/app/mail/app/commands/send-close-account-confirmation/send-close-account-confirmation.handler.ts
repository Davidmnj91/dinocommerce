import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { buildAccountClosedMailData } from '../../../domain/factory/closed-account-comfirmation-email.factory';
import { MailService } from '../../../domain/mail.service';
import { SendUserAccountClosedConfirmationEmailCommand } from './send-close-account-confirmation.command';

@CommandHandler(SendUserAccountClosedConfirmationEmailCommand)
export class SendUserAccountClosedConfirmationEmailCommandHandler
  implements ICommandHandler<SendUserAccountClosedConfirmationEmailCommand>
{
  constructor(private domainService: MailService) {}

  async execute(command: SendUserAccountClosedConfirmationEmailCommand): Promise<void> {
    const { email, username } = command;

    const mail = buildAccountClosedMailData({ to: email, username });
    this.domainService.sendMail(mail);
  }
}
