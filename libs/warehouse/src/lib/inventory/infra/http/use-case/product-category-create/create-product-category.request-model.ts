import { IsNotEmpty } from 'class-validator';

import { CreateProductCategoryRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryRequestModel implements CreateProductCategoryRequest {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '6661c23d-bc79-445a-b4bd-a6796e15b593', required: false })
  parentId?: string;
}
