import { AuthType, Roles } from '@petrocommerce/events';
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
  role: Roles = 'USER';

  @Column()
  authType: AuthType = 'EMAIL';

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
    this.userId = userId;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.role = role;
    this.authType = authType;
  }
}
