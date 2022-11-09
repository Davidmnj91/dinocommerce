import { plainToInstance } from 'class-transformer';

import { ProductsFindByCategoryApi } from '@dinocommerce/server-api';
import { PassportAuthGuard } from '@dinocommerce/shared';
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

import {
  GetProductByCategoryQuery,
} from '../../../../app/queries/product-get -by-category/get-product-by-category.query';
import { ProductViewModel } from '../../common/models/product.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/categories')
export class GetProductsByCategoryIdController implements ProductsFindByCategoryApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get a product under a given category' })
  @ApiResponse({
    status: 200,
    description: 'The products belonging to the requested product category',
    type: Array<ProductViewModel>,
  })
  @Get(':id/products')
  @HttpCode(HttpStatus.OK)
  async findProductsByCategory(@Param('id') productCategoryId: string): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductByCategoryQuery(productCategoryId));
    return plainToInstance(ProductViewModel, queryModel);
  }
}
