import { UserAddressArchivedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { UserAddressDomainService } from '../../../../domain/user/user-address.service';
import { ArchiveUserAddressCommand } from './archive-user-address.command';

@CommandHandler(ArchiveUserAddressCommand)
export class ArchiveUserAddressCommandHandler implements IInferredCommandHandler<ArchiveUserAddressCommand> {
  constructor(private domainService: UserAddressDomainService, private eventBus: EventBus) {}

  async execute(command: ArchiveUserAddressCommand): Promise<UserAddressArchivedEvent> {
    const { userId, userAddressId } = command;
    const userAddress = await this.domainService.findByUserIdAndUserAddressId(userId, userAddressId);

    userAddress.archive();

    this.domainService.saveUserAddress(userAddress);

    const event = new UserAddressArchivedEvent(userId, userAddressId);
    this.eventBus.publish(event);

    return event;
  }
}
