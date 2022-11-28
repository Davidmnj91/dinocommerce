import {
  AbstractEntity,
  OwnEntityProps,
  StringType,
} from '@dinocommerce/shared';
import {
  Entity,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';

import { ApplicationModule } from './application_permission';
import { Group } from './group';

@Entity()
@Unique({ properties: ['group', 'module'] })
export class Permission extends AbstractEntity {
  @Property({ type: () => StringType<ApplicationModule> })
  module: ApplicationModule;

  @Property()
  actions: string[];

  @ManyToOne(() => Group)
  group!: Group;

  constructor({ module, actions, group }: OwnEntityProps<Permission>) {
    super();
    this.module = module;
    this.actions = actions;
    this.group = group;
  }
}
