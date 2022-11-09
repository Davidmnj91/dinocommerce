import { IsNotEmpty } from 'class-validator';

import { UserAddressUpdatedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class UpdateUserAddressCommand extends Command<UserAddressUpdatedEvent> {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  userAddressId: string;
  @IsNotEmpty()
  addressLine: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  province: string;
  @IsNotEmpty()
  zipCode: string;
  @IsNotEmpty()
  country: string;

  constructor({
    userId,
    userAddressId,
    addressLine,
    city,
    province,
    zipCode,
    country,
  }: OwnCommandProps<UpdateUserAddressCommand>) {
    super();
    this.userId = userId;
    (this.userAddressId = userAddressId), (this.addressLine = addressLine);
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }
}
