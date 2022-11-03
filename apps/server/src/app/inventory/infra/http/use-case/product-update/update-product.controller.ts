import { ProductUpdateApi } from '@dinocommerce/server-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

import { PassportAuthGuard } from '../../../../../shared/auth';
import { UpdateProductCommand } from '../../../../app/commands/product-update/update-product.command';
import { UpdateProductRequestModel } from './update-product.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/products')
export class UpdateProductController implements ProductUpdateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update an existing Product' })
  @ApiResponse({
    status: 200,
    description: 'The updated product id',
    type: String,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Param('id') productId: string, @Body() product: UpdateProductRequestModel) {
    const { name, description, price, parentId, categoryId } = product;

    const { id } = await this.commandBus.execute(
      new UpdateProductCommand({ productId, name, description, price, parentId, categoryId })
    );
    return id;
  }
}
