import { GroupUpdatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { ApplicationModule } from '../../../../domain/operator/application_permission';
import { GroupDomainService } from '../../../../domain/operator/group.service';
import { Permission } from '../../../../domain/operator/permission';
import { PermissionDomainService } from '../../../../domain/operator/permission.service';
import { UpdateGroupCommand } from './update-group.command';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupCommandHandler implements IInferredCommandHandler<UpdateGroupCommand> {
  constructor(
    private domainService: GroupDomainService,
    private permissionDomainService: PermissionDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: UpdateGroupCommand): Promise<GroupUpdatedEvent> {
    const { id, name, permissions } = command;
    const group = await this.domainService.findGroupById(id);
    await this.domainService.assertGroupByName(name);

    await Promise.all([
      group.permissions.getItems().map((permission) => this.permissionDomainService.deletePermissions(permission)),
    ]);

    const groupPermissions = Object.keys(permissions).map(
      (permission: ApplicationModule) =>
        new Permission({ module: permission, actions: permissions[permission], group: group })
    );
    await Promise.all(groupPermissions.map((permission) => this.permissionDomainService.createPermission(permission)));

    const updated = await this.domainService.updateGroup(group, { name });

    const event = new GroupUpdatedEvent(updated.id, updated.name);

    this.eventBus.publish(event);

    return event;
  }
}
