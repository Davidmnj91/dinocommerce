import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendUserAccountClosedConfirmationEmailCommandHandler } from './app/commands/send-close-account-confirmation/send-close-account-confirmation.handler';
import { SendRegistryConfirmationEmailCommandHandler } from './app/commands/send-registry-confirmation/send-registry-confirmation.handler';
import { MailFactory } from './domain/factory/mail.factory';
import { MailService } from './domain/mail.service';
import { UserAccountClosedEventHandler } from './infra/event/usecase/user-closed/user-closed.handler';
import { UserRegisteredEventHandler } from './infra/event/usecase/user-register/user-register.handler';

const commandHandlers = [
  SendRegistryConfirmationEmailCommandHandler,
  SendUserAccountClosedConfirmationEmailCommandHandler,
];
const queryHandlers = [];
const eventHandlers = [UserRegisteredEventHandler, UserAccountClosedEventHandler];
const controllers = [];

@Module({
  imports: [CqrsModule],
  providers: [MailFactory, MailService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [],
  controllers: [...controllers],
})
export class MailModule {}
