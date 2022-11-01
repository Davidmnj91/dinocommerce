import { ConfigService } from '@nestjs/config';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { MailConfig, MAIL_CONFIG } from '../../../../config/mail.config';
import { buildContactUsMailData } from '../../../domain/factory/contact-us-email.factory';
import { MailService } from '../../../domain/mail.service';
import { ContactUsCommand } from './contact-us.command';

@CommandHandler(ContactUsCommand)
export class ContactUsCommandHandler implements IInferredCommandHandler<ContactUsCommand> {
  constructor(private domainService: MailService, private configService: ConfigService) {}

  async execute(command: ContactUsCommand): Promise<void> {
    const { clientEmail, clientName, messageTitle, messageBody } = command;
    const { defaultEmail } = this.configService.get<MailConfig>(MAIL_CONFIG);

    const mail = buildContactUsMailData({
      to: clientEmail,
      cc: defaultEmail,
      subject: messageTitle,
      body: messageBody,
      name: clientName,
    });
    await this.domainService.sendMail(mail);
  }
}
