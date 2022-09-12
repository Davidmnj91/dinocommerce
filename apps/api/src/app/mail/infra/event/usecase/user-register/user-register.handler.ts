import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '@petrocommerce/events';
import { SendRegistryConfirmationEmailCommand } from '../../../../app/commands/send-registry-confirmation/send-registry-confirmation.command';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler implements IEventHandler<UserRegisteredEvent> {
  constructor(private commandBus: CommandBus) {}

  async handle(event: UserRegisteredEvent) {
    const { userId, username } = event;
    this.commandBus.execute(new SendRegistryConfirmationEmailCommand(userId, username));
  }
}
