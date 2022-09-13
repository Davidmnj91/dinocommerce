import { AuthType, Roles } from '@petrocommerce/events';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/base.entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
  userId: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;

  @Column()
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
    this.userId = userId || new ObjectID().toString();
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
    this.authType = authType;
  }
}
