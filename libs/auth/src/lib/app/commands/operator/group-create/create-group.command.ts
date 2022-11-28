import { IsNotEmpty } from 'class-validator';

import { GroupCreatedEvent } from '@dinocommerce/events';

import {
  Command,
  OwnCommandProps,
} from '../../../../../../../shared/src';
import { ApplicationPermissions } from '../../../../domain/operator/application_permission';

export class CreateGroupCommand extends Command<GroupCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  readonly permissions: Partial<ApplicationPermissions>;

  constructor({ name, permissions }: OwnCommandProps<CreateGroupCommand>) {
    super();
    this.name = name;
    this.permissions = permissions;
  }
}
