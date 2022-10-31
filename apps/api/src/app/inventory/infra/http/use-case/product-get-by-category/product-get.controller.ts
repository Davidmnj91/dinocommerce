import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { GetProductByCategoryQuery } from '../../../../app/queries/product-get -by-category/get-product-by-category.query';
import { ProductViewModel } from '../../common/models/product.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class GetProductsByCategoryIdController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get a product under a given category' })
  @ApiResponse({
    status: 200,
    description: 'The products belonging to the requested product category',
    type: Array<ProductViewModel>,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductsByCategory(@Param('id') productCategoryId: string): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductByCategoryQuery(productCategoryId));
    return plainToInstance(ProductViewModel, queryModel);
  }
}
