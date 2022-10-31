import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryViewModel {
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly id: string;
  @ApiProperty({ example: 'a product category' })
  readonly name: string;
  @ApiProperty({ example: 'a product category description' })
  readonly description: string;
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly parentId: string;
  @ApiProperty({ type: Array<ProductCategoryViewModel> })
  readonly children?: ProductCategoryViewModel[];

  constructor(id: string, name: string, description: string, parentId: string, children?: ProductCategoryViewModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
    this.children = children;
  }
}
