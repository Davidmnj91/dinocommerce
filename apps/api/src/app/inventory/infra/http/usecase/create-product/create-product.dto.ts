import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product 1 description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 19.99 })
  price: number;

  @ApiProperty({ example: 300 })
  stock: number;

  @ApiProperty({ example: '6329fabb7ed56e6bdfc524fd' })
  parentId: string;
}
