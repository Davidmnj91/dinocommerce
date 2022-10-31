import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RestockProductRequestModel {
  @ApiProperty({ example: 200 })
  @IsNotEmpty()
  stock: number;

  constructor(stock: number) {
    this.stock = stock;
  }
}
