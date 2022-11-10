import { IsNotEmpty } from 'class-validator';

import { UpdateProductCategoryRequest } from '@dinocommerce/warehouse-api';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCategoryRequestModel implements UpdateProductCategoryRequest {
  @ApiProperty({ example: 'Updated Category 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Updated Category 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '3ca70292-2433-47b4-88dc-16e76a9424de', required: false })
  parentId?: string;
}
