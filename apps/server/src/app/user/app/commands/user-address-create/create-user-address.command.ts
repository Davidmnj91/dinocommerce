import { IsNotEmpty } from 'class-validator';

import { UserAddressCreatedEvent } from '@dinocommerce/events';

import { Command, OwnCommandProps } from '../../../../shared/cqrs';

export class CreateUserAddressCommand extends Command<UserAddressCreatedEvent> {
  @IsNotEmpty()
  userId: string;
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

  constructor({ userId, addressLine, city, province, zipCode, country }: OwnCommandProps<CreateUserAddressCommand>) {
    super();
    this.userId = userId;
    this.addressLine = addressLine;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }
}
