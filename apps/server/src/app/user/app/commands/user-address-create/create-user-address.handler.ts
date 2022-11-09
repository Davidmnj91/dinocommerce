import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { UserAddressCreatedEvent } from '../../../../../../../../libs/events/src';
import { UserAddressDomainService } from '../../../domain/user-address.service';
import { UserAddress } from '../../../domain/user-adress.entity';
import { UserDomainService } from '../../../domain/user.service';
import { CreateUserAddressCommand } from './create-user-address.command';

@CommandHandler(CreateUserAddressCommand)
export class CreateUserAddressCommandHandler implements IInferredCommandHandler<CreateUserAddressCommand> {
  constructor(
    private domainService: UserAddressDomainService,
    private userDomainService: UserDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: CreateUserAddressCommand): Promise<UserAddressCreatedEvent> {
    const { userId, addressLine, city, province, zipCode, country } = command;

    const user = await this.userDomainService.findUserById(userId);

    const userAddress = new UserAddress({ userId: user.id, addressLine, city, province, zipCode, country });
    const createdUserAddress = await this.domainService.createUserAddress(userAddress);

    const event = new UserAddressCreatedEvent(userId, createdUserAddress.id);
    this.eventBus.publish(event);

    return event;
  }
}
