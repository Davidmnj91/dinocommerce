import { UserRegisteredEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';

import { User } from '../../../domain/user.entity';
import { UserDomainService } from '../../../domain/user.service';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements IInferredCommandHandler<CreateUserCommand> {
  constructor(private domainService: UserDomainService, private eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { userId, email, password, username, authType, role, profilePictureUrl } = command;

    await this.domainService.checkUserNotExists(email);

    const user = new User({ userId, email, phone: '', username, password, role, authType, profilePictureUrl });

    await this.domainService.saveUser(user);

    const event = new UserRegisteredEvent(email, username, authType);
    this.eventBus.publish(event);

    return user;
  }
}
