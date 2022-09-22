import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAccountClosedEvent } from '@dinocommerce/events';
import { SendUserAccountClosedConfirmationEmailCommand } from '../../../../app/commands/send-close-account-confirmation/send-close-account-confirmation.command';

@EventsHandler(UserAccountClosedEvent)
export class UserAccountClosedEventHandler implements IEventHandler<UserAccountClosedEvent> {
  constructor(private commandBus: CommandBus) {}

  async handle(event: UserAccountClosedEvent) {
    const { email, username } = event;

    this.commandBus.execute(new SendUserAccountClosedConfirmationEmailCommand(email, username));
  }
}
