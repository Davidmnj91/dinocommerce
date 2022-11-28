import {
  Expose,
  Type,
} from 'class-transformer';

import { ProductModel } from '@dinocommerce/warehouse-api';
import { ApiProperty } from '@nestjs/swagger';

import { MediaViewModel } from './media.view-model';

export class ProductViewModel implements ProductModel {
  @Expose()
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly id: string;
  @Expose()
  @ApiProperty({ example: 'a product' })
  readonly name: string;
  @Expose()
  @ApiProperty({ example: 'a product description' })
  readonly description: string;
  @Expose()
  @ApiProperty({ example: 9.99 })
  readonly price?: number;
  @Expose()
  @ApiProperty({ example: 100 })
  readonly stock?: number;
  @Expose()
  @Type(() => Array<MediaViewModel>)
  @ApiProperty({ type: Array<MediaViewModel> })
  readonly media?: MediaViewModel[];
  @Expose()
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly parentId: string;
  @Expose()
  @ApiProperty({ type: Array<ProductViewModel> })
  readonly children?: ProductViewModel[];
}
