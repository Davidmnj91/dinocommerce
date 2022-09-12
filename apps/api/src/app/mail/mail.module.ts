import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendRegistryConfirmationEmailCommandHandler } from './app/commands/send-registry-confirmation/send-registry-confirmation.handler';
import { MailFactory } from './domain/factory/mail.factory';
import { MailService } from './domain/mail.service';
import { UserRegisteredEventHandler } from './infra/event/usecase/user-register/user-register.handler';

const commandHandlers = [SendRegistryConfirmationEmailCommandHandler];
const queryHandlers = [];
const eventHandlers = [UserRegisteredEventHandler];
const controllers = [];

@Module({
  imports: [CqrsModule],
  providers: [MailFactory, MailService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [],
  controllers: [...controllers],
})
export class MailModule {}
