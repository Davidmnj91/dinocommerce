import { UserAddressUpdatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { UserAddressDomainService } from '../../../../domain/user/user-address.service';
import { UpdateUserAddressCommand } from './update-user-address.command';

@CommandHandler(UpdateUserAddressCommand)
export class UpdateUserAddressCommandHandler implements IInferredCommandHandler<UpdateUserAddressCommand> {
  constructor(private domainService: UserAddressDomainService, private eventBus: EventBus) {}

  async execute(command: UpdateUserAddressCommand): Promise<UserAddressUpdatedEvent> {
    const { userId, userAddressId, addressLine, city, province, zipCode, country } = command;

    const existingUserAddress = await this.domainService.findByUserIdAndUserAddressId(userId, userAddressId);

    const updated = await this.domainService.updateUserAddress(existingUserAddress, {
      addressLine,
      city,
      province,
      zipCode,
      country,
    });

    const event = new UserAddressUpdatedEvent(userId, updated.id);
    this.eventBus.publish(event);

    return event;
  }
}
