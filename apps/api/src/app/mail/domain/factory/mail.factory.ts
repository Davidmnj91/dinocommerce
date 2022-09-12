import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailFactoryNotFoundException } from '../exception/mail-factory-not-found.exception';
import { buildRegistryMail, RegistryEmailData } from './registry-comfirmation-email.factory';

export type MailData = RegistryEmailData;

// TODO: Copy Factory like ConfigModule
@Injectable()
export class MailFactory {
  build(props: MailData): ISendMailOptions {
    switch (props.type) {
      case 'CONFIRM_REGISTRY':
        return buildRegistryMail(props);
      default:
        throw new MailFactoryNotFoundException();
    }
  }
}
