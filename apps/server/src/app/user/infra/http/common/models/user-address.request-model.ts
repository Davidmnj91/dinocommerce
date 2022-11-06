import { IsNotEmpty } from 'class-validator';

import { CreateUserAddressRequestModel } from '../../usecase/user-address-create/create-user-address.request-model';

export class UserAddressQueryModel implements CreateUserAddressRequestModel {
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

  constructor(addressLine: string, city: string, province: string, zipCode: string, country: string) {
    this.addressLine = addressLine;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }
}
