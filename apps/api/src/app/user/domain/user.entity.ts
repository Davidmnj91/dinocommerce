import { AuthType, Roles } from '@dinocommerce/events';
import { Entity, Index, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { StringType } from '../../database/types/auth-type.type';
import { AbstractEntity, OwnEntityProps } from '../../shared/database/base.entity';
import { UserAlreadyDeletedException } from './exception/user-already-deleted.exception';

@Index({ name: 'userId_idx', properties: ['userId'] }) // simple index, with custom name
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
