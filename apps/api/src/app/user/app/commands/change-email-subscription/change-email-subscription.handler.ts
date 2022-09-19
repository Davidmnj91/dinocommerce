import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../../domain/user.service';
import { ChangeEmailSubscriptionCommand } from './change-email.subscription.command';

@CommandHandler(ChangeEmailSubscriptionCommand)
export class ChangeEmailSubscriptionCommandHandler implements IInferredCommandHandler<ChangeEmailSubscriptionCommand> {
  constructor(private domainService: UserService) {}

  async execute(command: ChangeEmailSubscriptionCommand): Promise<void> {
    const { userId, subscribe } = command;

    const user = await this.domainService.findUserById(userId);

    user.changeMailSubscription(subscribe);

    await this.domainService.saveUser(user);
  }
}
