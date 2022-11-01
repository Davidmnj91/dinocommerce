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

  @ApiProperty({ example: '6329fabb7ed56e6bdfc524fd', required: false })
  parentId?: string;
}
