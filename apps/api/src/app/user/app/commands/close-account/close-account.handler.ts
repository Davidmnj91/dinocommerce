import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserAccountClosedEvent } from '@petrocommerce/events';
import { UserService } from '../../../domain/user.service';
import { CloseUserAccountCommand } from './close-account.command';

@CommandHandler(CloseUserAccountCommand)
export class CloseUserAccountCommandHandler implements ICommandHandler<CloseUserAccountCommand> {
  constructor(private domainService: UserService, private eventBus: EventBus) {}

  async execute(command: CloseUserAccountCommand): Promise<void> {
    const user = await this.domainService.findUserById(command.userId);

    user.closeAccount();

    await this.domainService.saveUser(user);

    this.eventBus.publish(new UserAccountClosedEvent(user.email, user.username));
  }
}
