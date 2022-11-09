import { UserAccountClosedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/user.service';
import { CloseUserAccountCommand } from './close-account.command';

@CommandHandler(CloseUserAccountCommand)
export class CloseUserAccountCommandHandler implements IInferredCommandHandler<CloseUserAccountCommand> {
  constructor(private domainService: UserDomainService, private eventBus: EventBus) {}

  async execute(command: CloseUserAccountCommand): Promise<UserAccountClosedEvent> {
    const user = await this.domainService.findUserById(command.userId);

    user.closeAccount();

    await this.domainService.saveUser(user);

    const event = new UserAccountClosedEvent(user.email, user.username);
    this.eventBus.publish(event);

    return event;
  }
}
