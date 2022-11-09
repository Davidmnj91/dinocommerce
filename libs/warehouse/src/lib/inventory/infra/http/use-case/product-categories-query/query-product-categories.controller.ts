import { plainToInstance } from 'class-transformer';

import { ProductCategoriesQueryApi } from '@dinocommerce/server-api';
import { PassportAuthGuard } from '@dinocommerce/shared';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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

import { GetProductCategoriesQuery } from '../../../../app/queries/product-categories-get/get-product-categories.query';
import { ProductCategoryViewModel } from '../../common/models/product-category.view-model';
import { QueryProductCategoriesRequestModel } from './query-product-category.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/categories')
export class QueryProductCategoriesController implements ProductCategoriesQueryApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Product category' })
  @ApiResponse({
    status: 200,
    description: 'The matching product categories',
    type: Array<ProductCategoryViewModel>,
  })
  @Post('query') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async queryProductCategories(@Body() query: QueryProductCategoriesRequestModel): Promise<ProductCategoryViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductCategoriesQuery(query));
    return plainToInstance(ProductCategoryViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
