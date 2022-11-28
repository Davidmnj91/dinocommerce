import { GroupCreatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { ApplicationModule } from '../../../../domain/operator/application_permission';
import { Group } from '../../../../domain/operator/group';
import { GroupDomainService } from '../../../../domain/operator/group.service';
import { Permission } from '../../../../domain/operator/permission';
import { PermissionDomainService } from '../../../../domain/operator/permission.service';
import { CreateGroupCommand } from './create-group.command';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler implements IInferredCommandHandler<CreateGroupCommand> {
  constructor(
    private domainService: GroupDomainService,
    private permissionDomainService: PermissionDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: CreateGroupCommand): Promise<GroupCreatedEvent> {
    const { name, permissions } = command;

    await this.domainService.assertGroupByName(name);

    const group = new Group({ name });
    const saved = await this.domainService.saveGroup(group);

    const groupPermissions = Object.keys(permissions).map(
      (permission: ApplicationModule) =>
        new Permission({ module: permission, actions: permissions[permission], group: group })
    );

    await Promise.all(groupPermissions.map((permission) => this.permissionDomainService.createPermission(permission)));

    const event = new GroupCreatedEvent(saved.id, saved.name);

    this.eventBus.publish(event);

    return event;
  }
}
