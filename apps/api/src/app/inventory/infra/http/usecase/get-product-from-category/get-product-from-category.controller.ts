import { Controller, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class GetProductCategoriesController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List products from category' })
  @Query()
  @HttpCode(HttpStatus.OK)
  async getProductsByCategory(): Promise<ProductListDto> {
    return await this.queryBus.execute(new GetProductsByCategoryQuery());
  }
}
