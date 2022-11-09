import { IsNotEmpty } from 'class-validator';

import { CreateUserAddressRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressRequestModel implements CreateUserAddressRequest {
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
