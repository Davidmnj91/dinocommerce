import { ApiProperty } from '@nestjs/swagger';
import { MediaViewModel } from './media.view-model';

export class ProductViewModel {
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly id: string;
  @ApiProperty({ example: 'a product' })
  readonly name: string;
  @ApiProperty({ example: 'a product description' })
  readonly description: string;
  @ApiProperty({ example: 9.99 })
  readonly price?: number;
  @ApiProperty({ example: 100 })
  readonly stock?: number;
  @ApiProperty({ type: Array<MediaViewModel> })
  readonly media?: MediaViewModel[];
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly parentId: string;
  @ApiProperty({ type: Array<ProductViewModel> })
  readonly children?: ProductViewModel[];
}
