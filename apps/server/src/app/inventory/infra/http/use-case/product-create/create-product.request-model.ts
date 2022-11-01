import { IsNotEmpty } from 'class-validator';

import { CreateProductRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestModel implements CreateProductRequest {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 19.99 })
  price?: number;

  @ApiProperty({ example: 300 })
  stock?: number;

  @ApiProperty({ example: '6329fabb7ed56e6bdfc524fd' })
  parentId?: string;

  @ApiProperty({ example: '6329fabb7ed56e6bdfc524fd' })
  categoryId?: string;
}
