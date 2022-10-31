import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { OwnEntityProps } from '../../../../../shared/database/base.entity';
import { QueryExpression } from '../../../../../shared/query/queryable.dto';
import { GetProductsQuery } from '../../../../app/queries/products-get/get-products.query';
import { Product } from '../../../../domain/product';
import { ProductViewModel } from '../../common/models/product.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class GetProductsController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Products from query' })
  @ApiResponse({
    status: 200,
    description: 'The matching products',
    type: Array<ProductViewModel>,
  })
  @Post('query') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async getProducts(@Body() query: QueryExpression<OwnEntityProps<Product>>): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductsQuery(query));
    return plainToInstance(ProductViewModel, queryModel);
  }
}
