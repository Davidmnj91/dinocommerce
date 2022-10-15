import { UserRegisteredEvent } from '@dinocommerce/events';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SendRegistryConfirmationEmailCommand } from '../../../../app/commands/send-registry-confirmation/send-registry-confirmation.command';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler implements IEventHandler<UserRegisteredEvent> {
  constructor(private commandBus: CommandBus) {}

  async handle(event: UserRegisteredEvent) {
    const { email, username } = event;
    this.commandBus.execute(new SendRegistryConfirmationEmailCommand({ email, username }));
  }
}
