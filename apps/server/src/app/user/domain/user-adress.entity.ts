import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';

import { AbstractEntity, OwnEntityProps } from '../../shared/database/base.entity';
import { UserAddressAlreadyArchivedException } from './exception/user-address-already-archived.exception';
import { User } from './user.entity';

@Entity()
export class UserAddress extends AbstractEntity {
  @Index()
  @ManyToOne(() => User)
  user: User;

  @Property()
  addressLine: string;

  @Property()
  city: string;

  @Property()
  province: string;

  @Property()
  zipCode: string;

  @Property()
  country: string;

  constructor({ user, addressLine, city, province, zipCode, country }: OwnEntityProps<UserAddress>) {
    super();
    this.user = user;
    this.addressLine = addressLine;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }

  archive() {
    if (this.deletedAt) {
      throw new UserAddressAlreadyArchivedException(this.id);
    }
    this.deletedAt = new Date();
  }
}
