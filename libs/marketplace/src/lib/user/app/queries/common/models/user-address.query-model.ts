import { Expose } from 'class-transformer';

export class UserAddressQueryModel {
  @Expose()
  id: string;
  @Expose()
  addressLine: string;
  @Expose()
  city: string;
  @Expose()
  province: string;
  @Expose()
  zipCode: string;
  @Expose()
  country: string;

  constructor(id: string, addressLine: string, city: string, province: string, zipCode: string, country: string) {
    this.id = id;
    this.addressLine = addressLine;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }
}
