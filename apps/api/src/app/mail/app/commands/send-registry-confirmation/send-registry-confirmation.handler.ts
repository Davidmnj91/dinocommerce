import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { buildRegistryMailData } from '../../../domain/factory/registry-comfirmation-email.factory';
import { MailService } from '../../../domain/mail.service';
import { SendRegistryConfirmationEmailCommand } from './send-registry-confirmation.command';

@CommandHandler(SendRegistryConfirmationEmailCommand)
export class SendRegistryConfirmationEmailCommandHandler
  implements ICommandHandler<SendRegistryConfirmationEmailCommand>
{
  constructor(private domainService: MailService) {}

  async execute(command: SendRegistryConfirmationEmailCommand): Promise<void> {
    const { userId, username } = command;

    const mail = buildRegistryMailData({ to: userId, username });
    this.domainService.sendMail(mail);
  }
}
