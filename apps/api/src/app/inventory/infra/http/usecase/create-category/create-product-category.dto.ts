import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Category 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Category 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '6329fabb7ed56e6bdfc524fd' })
  parentId: string;
}
