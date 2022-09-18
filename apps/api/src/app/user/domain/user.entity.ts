import { Entity, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { AuthType, Roles } from '@petrocommerce/events';
import { AbstractEntity } from '../../shared/base.entity';
import { UserAlreadyDeletedException } from './exception/user-already-deleted.exception';

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

  @Property({ nullable: true })
  profilePictureUrl?: string;

  constructor(
    userId: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    role: Roles,
    authType: AuthType,
    profilePictureUrl?: string
  ) {
    super();
    this.userId = userId || new ObjectId().toString();
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
    this.authType = authType;
    this.profilePictureUrl = profilePictureUrl;
  }

  closeAccount() {
    if (this.deletedAt) {
      throw new UserAlreadyDeletedException(this.email);
    }
    this.deletedAt = new Date();
  }
}
