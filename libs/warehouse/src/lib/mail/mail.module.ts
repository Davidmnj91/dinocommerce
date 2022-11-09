import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ContactUsCommandHandler } from './app/commands/contact-us/contact-us.handler';
import {
  SendUserAccountClosedConfirmationEmailCommandHandler,
} from './app/commands/send-close-account-confirmation/send-close-account-confirmation.handler';
import {
  SendRegistryConfirmationEmailCommandHandler,
} from './app/commands/send-registry-confirmation/send-registry-confirmation.handler';
import { MailFactory } from './domain/factory/mail.factory';
import { MailService } from './domain/mail.service';
import { UserAccountClosedEventHandler } from './infra/event/use-case/user-closed/user-closed.handler';
import { UserRegisteredEventHandler } from './infra/event/use-case/user-register/user-register.handler';
import { ContactUsController } from './infra/http/use-case/contact/contact-us.controller';

const commandHandlers = [
  SendRegistryConfirmationEmailCommandHandler,
  SendUserAccountClosedConfirmationEmailCommandHandler,
  ContactUsCommandHandler,
];
const queryHandlers = [];
const eventHandlers = [UserRegisteredEventHandler, UserAccountClosedEventHandler];
const controllers = [ContactUsController];

@Module({
  imports: [CqrsModule],
  providers: [MailFactory, MailService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [],
  controllers: [...controllers],
})
export class MailModule {}
