import { IsNotEmpty } from 'class-validator';

import { GroupUpdatedEvent } from '@dinocommerce/events';

import {
  Command,
  OwnCommandProps,
} from '../../../../../../../shared/src';
import { ApplicationPermissions } from '../../../../domain/operator/application_permission';

export class UpdateGroupCommand extends Command<GroupUpdatedEvent> {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  readonly permissions: Partial<ApplicationPermissions>;

  constructor({ id, name, permissions }: OwnCommandProps<UpdateGroupCommand>) {
    super();
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
