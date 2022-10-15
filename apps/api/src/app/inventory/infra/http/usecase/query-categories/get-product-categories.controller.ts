import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { OwnEntityProps } from '../../../../../shared/database/base.entity';
import { Queryable } from '../../../../../shared/query/queryable.dto';
import { GetProductCategoriesQuery } from '../../../../app/queries/get-product-categories/get-product-categories.query';
import { ProductCategoriesListDto } from '../../../../app/queries/get-product-categories/product-categories-list.query-model';
import { ProductCategory } from '../../../../domain/product-category';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class GetProductCategoriesController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Product category' })
  @Post('query') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async getProductCategories(
    @Body() query: Queryable<OwnEntityProps<ProductCategory>>
  ): Promise<ProductCategoriesListDto> {
    return await this.queryBus.execute(new GetProductCategoriesQuery(query));
  }
}
