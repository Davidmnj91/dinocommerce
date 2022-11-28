import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToMany,
  Property,
} from '@mikro-orm/core';

import { Group } from './group';

@Entity()
export class Operator extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  lastName: string;

  @Property()
  dateOfBirth: Date;

  @Index()
  @Property({ unique: true })
  email: string;

  @Property({ unique: true })
  phone: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  profilePictureUrl?: string;

  @Property({ onUpdate: () => new Date(), nullable: true })
  lastLogin?: Date;

  @ManyToMany({ entity: () => Group, owner: true, cascade: [Cascade.REMOVE], eager: true, nullable: true })
  groups?: Collection<Group> = new Collection<Group>(this);

  @Property()
  isSuperUser: boolean;

  constructor({
    name,
    lastName,
    dateOfBirth,
    email,
    phone,
    password,
    profilePictureUrl,
    isSuperUser,
  }: OwnEntityProps<Operator>) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.profilePictureUrl = profilePictureUrl;
    this.isSuperUser = isSuperUser;
  }
}
