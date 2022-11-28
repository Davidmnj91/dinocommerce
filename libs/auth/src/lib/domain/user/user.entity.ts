import { v4 } from 'uuid';

import {
  AuthType,
  Roles,
} from '@dinocommerce/events';
import {
  AbstractEntity,
  OwnEntityProps,
  StringType,
} from '@dinocommerce/shared';
import {
  Entity,
  Index,
  Property,
} from '@mikro-orm/core';

import { UserAlreadyDeletedException } from './exception/user-already-deleted.exception';

@Entity()
export class User extends AbstractEntity {
  @Index()
  @Property({ unique: true })
  userId: string;

  @Property({ unique: true })
  email: string;

  @Property({ unique: true })
  phone: string;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property({ type: StringType<Roles> })
  role: Roles;

  @Property({ type: StringType<AuthType> })
  authType: AuthType;

  @Property({ nullable: true })
  profilePictureUrl?: string;

  @Property()
  emailSubscription?: boolean;

  constructor({
    userId,
    email,
    phone,
    username,
    password,
    role,
    authType,
    profilePictureUrl,
    emailSubscription = true,
  }: OwnEntityProps<User>) {
    super();
    this.userId = userId || v4();
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
    this.authType = authType;
    this.profilePictureUrl = profilePictureUrl;
    this.emailSubscription = emailSubscription;
  }

  changeMailSubscription(emailSubscription: boolean) {
    this.emailSubscription = emailSubscription;
  }

  closeAccount() {
    if (this.deletedAt) {
      throw new UserAlreadyDeletedException(this.email);
    }
    this.deletedAt = new Date();
  }
}
