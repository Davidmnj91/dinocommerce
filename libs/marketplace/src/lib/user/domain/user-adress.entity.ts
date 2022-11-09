import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Entity,
  Index,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

import { UserAddressAlreadyArchivedException } from './exception/user-address-already-archived.exception';
import { User } from './user.entity';

@Entity()
export class UserAddress extends AbstractEntity {
  @Index()
  @ManyToOne(() => User, { mapToPk: true })
  userId: string;

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

  constructor({ userId, addressLine, city, province, zipCode, country }: OwnEntityProps<UserAddress>) {
    super();
    this.userId = userId;
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
