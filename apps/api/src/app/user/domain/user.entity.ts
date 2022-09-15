import { Entity, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { AuthType, Roles } from '@petrocommerce/events';
import { AbstractEntity } from '../../shared/base.entity';

@Entity()
export class User extends AbstractEntity {
  @Property()
  userId: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  role: Roles;

  @Property()
  authType: AuthType;

  constructor(
    userId: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    role: Roles,
    authType: AuthType
  ) {
    super();
    this.userId = userId || new ObjectId().toString();
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
    this.authType = authType;
  }
}
