import { Expose } from 'class-transformer';

import { UserAddressModel } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddressViewModel implements UserAddressModel {
  @Expose()
  @ApiProperty({ example: 'ffc34042-d176-47fe-b324-ddcfc461c438' })
  id: string;
  @Expose()
  @ApiProperty({ example: 'Gran Via, 43, 4B' })
  addressLine: string;
  @Expose()
  @ApiProperty({ example: 'Madrid' })
  city: string;
  @Expose()
  @ApiProperty({ example: 'Madrid' })
  province: string;
  @Expose()
  @ApiProperty({ example: '28013' })
  zipCode: string;
  @Expose()
  @ApiProperty({ example: 'Spain' })
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
