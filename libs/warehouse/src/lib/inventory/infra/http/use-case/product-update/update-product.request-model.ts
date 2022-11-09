import { IsNotEmpty } from 'class-validator';

import { UpdateProductRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductRequestModel implements UpdateProductRequest {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 19.99, required: false })
  price?: number;

  @ApiProperty({ example: 'cdb1c985-30f4-435a-8bb8-47f682cc0e6f', required: false })
  parentId?: string;

  @ApiProperty({ example: '0d2446b4-64c8-4038-a778-6eba7842833a', required: false })
  categoryId?: string;
}
