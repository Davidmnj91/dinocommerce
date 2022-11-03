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

  @ApiProperty({ example: 19.99, required: false })
  price?: number;

  @ApiProperty({ example: '0e24f9f6-905d-4c08-b73e-a68ca43a85c9', required: false })
  parentId?: string;

  @ApiProperty({ example: 'd1950685-d0af-4e55-862f-4f1ad4512c57', required: false })
  categoryId?: string;
}
