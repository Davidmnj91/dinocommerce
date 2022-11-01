import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductCategoryViewModel {
  @Expose()
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly id: string;
  @Expose()
  @ApiProperty({ example: 'a product category' })
  readonly name: string;
  @Expose()
  @ApiProperty({ example: 'a product category description' })
  readonly description: string;
  @Expose()
  @ApiProperty({ example: '1cfa35f4-0ed5-4c2a-8e4f-20c8c1b69363' })
  readonly parentId: string;

  constructor(id: string, name: string, description: string, parentId: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
