import { PassportAuthGuard } from '@dinocommerce/shared';
import { ProductRestockApi } from '@dinocommerce/warehouse-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RestockProductCommand } from '../../../../app/commands/product-restock/restock-product.command';
import { RestockProductRequestModel } from './restock-product.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/products')
export class RestockProductController implements ProductRestockApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update stock on a given product id' })
  @ApiResponse({
    status: 200,
    description: 'The updated product stock id',
    type: String,
  })
  @Put(':id/restock')
  @HttpCode(HttpStatus.OK)
  async restockProduct(@Param('id') productId: string, @Body() restock: RestockProductRequestModel) {
    const { stock } = restock;

    const { id } = await this.commandBus.execute(new RestockProductCommand({ productId, stock }));
    return id;
  }
}
