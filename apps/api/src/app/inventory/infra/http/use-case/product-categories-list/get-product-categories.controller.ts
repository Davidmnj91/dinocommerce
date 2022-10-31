import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { OwnEntityProps } from '../../../../../shared/database/base.entity';
import { QueryExpression } from '../../../../../shared/query/queryable.dto';
import { GetProductCategoriesQuery } from '../../../../app/queries/product-categories-get/get-product-categories.query';
import { ProductCategory } from '../../../../domain/product-category';
import { ProductCategoryViewModel } from '../../common/models/product-category.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class GetProductCategoriesController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Product category' })
  @ApiResponse({
    status: 200,
    description: 'The matching product categories',
    type: Array<ProductCategoryViewModel>,
  })
  @Post('query') // Until HTTP Query method is supported
  @HttpCode(HttpStatus.OK)
  async getProductCategories(
    @Body() query: QueryExpression<OwnEntityProps<ProductCategory>>
  ): Promise<ProductCategoryViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductCategoriesQuery(query));
    return plainToInstance(ProductCategoryViewModel, queryModel);
  }
}
