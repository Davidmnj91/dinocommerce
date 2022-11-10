import { IsNotEmpty } from 'class-validator';

import { UpdateUserAddressRequest } from '@dinocommerce/warehouse-api';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAddressRequestModel implements UpdateUserAddressRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'Gran Via, 43, 4B' })
  addressLine: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Madrid' })
  city: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Madrid' })
  province: string;
  @IsNotEmpty()
  @ApiProperty({ example: '28013' })
  zipCode: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Spain' })
  country: string;
}
