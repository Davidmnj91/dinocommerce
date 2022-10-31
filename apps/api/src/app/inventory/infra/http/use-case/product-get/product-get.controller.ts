import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { GetProductQuery } from '../../../../app/queries/product-get/get-product.query';
import { ProductViewModel } from '../../common/models/product.view-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class GetProductController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({
    status: 200,
    description: 'The requested product',
    type: ProductViewModel,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id') productId: string): Promise<ProductViewModel> {
    const queryModel = await this.queryBus.execute(new GetProductQuery(productId));
    return plainToClass(ProductViewModel, queryModel);
  }
}
