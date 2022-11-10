import { plainToInstance } from 'class-transformer';

import { PassportAuthGuard } from '@dinocommerce/shared';
import { ProductsQueryApi } from '@dinocommerce/warehouse-api';
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

import { GetProductsQuery } from '../../../../app/queries/products-get/get-products.query';
import { ProductViewModel } from '../../common/models/product.view-model';
import { QueryProductsRequestModel } from './query-product.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/products')
export class QueryProductsController implements ProductsQueryApi {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Products from query' })
  @ApiResponse({
    status: 200,
    description: 'The matching products',
    type: Array<ProductViewModel>,
  })
  @Post('query') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async queryProducts(@Body() query: QueryProductsRequestModel): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductsQuery(query));
    return plainToInstance(ProductViewModel, queryModel, { excludeExtraneousValues: true });
  }
}
