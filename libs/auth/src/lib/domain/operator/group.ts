import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Cascade,
  Collection,
  Entity,
  LoadStrategy,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { Permission } from './permission';

@Entity()
export class Group extends AbstractEntity {
  @Property({ unique: true })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.group, {
    nullable: true,
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
    eager: true,
  })
  permissions?: Collection<Permission> = new Collection<Permission>(this);

  constructor({ name, permissions }: OwnEntityProps<Group>) {
    super();
    this.name = name;
    this.permissions = permissions;
  }
}
