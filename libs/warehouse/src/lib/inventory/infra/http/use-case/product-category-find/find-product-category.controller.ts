import { plainToClass } from 'class-transformer';

import {
  OperatorAuthGuard,
  Permissions,
} from '@dinocommerce/auth';
import { ProductCategoryFindApi } from '@dinocommerce/warehouse-api';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProductCategoryQuery } from '../../../../app/queries/product-category-get/get-product-category.query';
import { ProductCategoryViewModel } from '../../common/models/product-category.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ PRODUCT_CATEGORY: ['VIEW'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class FindProductCategoryController implements ProductCategoryFindApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get a product category by id' })
  @ApiResponse({
    status: 200,
    description: 'The requested product category',
    type: ProductCategoryViewModel,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findProductCategory(@Param('id') productCategoryId: string): Promise<ProductCategoryViewModel> {
    const queryModel = await this.queryBus.execute(new GetProductCategoryQuery(productCategoryId));
    return plainToClass(ProductCategoryViewModel, queryModel);
  }
}
