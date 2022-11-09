import { IsNotEmpty } from 'class-validator';

import { RestockProductRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class RestockProductRequestModel implements RestockProductRequest {
  @ApiProperty({ example: 200 })
  @IsNotEmpty()
  stock: number;

  constructor(stock: number) {
    this.stock = stock;
  }
}
