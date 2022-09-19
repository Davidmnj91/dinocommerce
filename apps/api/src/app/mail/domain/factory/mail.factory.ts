import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailFactoryNotFoundException } from '../exception/mail-factory-not-found.exception';
import { AccountClosedEmailData, buildAccountClosedMail } from './closed-account-comfirmation-email.factory';
import { buildContactUsMail, ContactUsEmailData } from './contact-us-email.factory';
import { buildRegistryMail, RegistryEmailData } from './registry-comfirmation-email.factory';

export type MailData = RegistryEmailData | AccountClosedEmailData | ContactUsEmailData;

// TODO: Copy Factory like ConfigModule
@Injectable()
export class MailFactory {
  build(props: MailData): ISendMailOptions {
    switch (props.type) {
      case 'CONFIRM_REGISTRY':
        return buildRegistryMail(props);
      case 'ACCOUNT_CLOSED':
        return buildAccountClosedMail(props);
      case 'CONTACT_US':
        return buildContactUsMail(props);
      default:
        throw new MailFactoryNotFoundException();
    }
  }
}
