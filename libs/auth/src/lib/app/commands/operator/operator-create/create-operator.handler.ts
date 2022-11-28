import { OperatorCreatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { GroupNotFoundException } from '../../../../domain/exception/group-not-found.exception';
import { GroupDomainService } from '../../../../domain/operator/group.service';
import { Operator } from '../../../../domain/operator/operator';
import { OperatorDomainService } from '../../../../domain/operator/operator.service';
import { CreateOperatorCommand } from './create-operator.command';

@CommandHandler(CreateOperatorCommand)
export class CreateOperatorCommandHandler implements IInferredCommandHandler<CreateOperatorCommand> {
  constructor(private domainService: OperatorDomainService, private groupDomainService: GroupDomainService) {}

  async execute(command: CreateOperatorCommand): Promise<OperatorCreatedEvent> {
    const { name, lastName, email, phone, dateOfBirth, password, isSuperUser, groups, profilePictureUrl } = command;

    await this.domainService.checkOperatorNotExists(email);

    const foundGroups = await this.groupDomainService.findGroupsById(groups);
    const notFoundGroups = groups.filter((group) => !foundGroups.find((g) => g.id === group));

    if (notFoundGroups) {
      throw new GroupNotFoundException(notFoundGroups.join(', '));
    }

    const operator = new Operator({
      name,
      lastName,
      dateOfBirth,
      email,
      phone,
      password,
      profilePictureUrl,
      isSuperUser,
    });

    const created = await this.domainService.saveOperator(operator);

    const event = new OperatorCreatedEvent(created.id, created.email, created.name, created.lastName);

    return event;
  }
}
