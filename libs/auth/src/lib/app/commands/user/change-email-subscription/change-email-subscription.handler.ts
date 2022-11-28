import { UserAccountUnsubscribedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { UserDomainService } from '../../../../domain/user/user.service';
import { ChangeEmailSubscriptionCommand } from './change-email.subscription.command';

@CommandHandler(ChangeEmailSubscriptionCommand)
export class ChangeEmailSubscriptionCommandHandler implements IInferredCommandHandler<ChangeEmailSubscriptionCommand> {
  constructor(private domainService: UserDomainService, private eventBus: EventBus) {}

  async execute(command: ChangeEmailSubscriptionCommand): Promise<UserAccountUnsubscribedEvent> {
    const { userId, subscribe } = command;

    const user = await this.domainService.findUserById(userId);

    user.changeMailSubscription(subscribe);

    await this.domainService.saveUser(user);

    const event = new UserAccountUnsubscribedEvent(user.id);
    this.eventBus.publish(event);

    return event;
  }
}
