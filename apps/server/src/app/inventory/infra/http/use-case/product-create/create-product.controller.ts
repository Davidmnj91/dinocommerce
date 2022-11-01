import { ProductCreateApi } from '@dinocommerce/server-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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
import { CreateProductCommand } from '../../../../app/commands/product-create/create-product.command';
import { CreateProductRequestModel } from './create-product.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/products')
export class CreateProductController implements ProductCreateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Product' })
  @ApiResponse({
    status: 200,
    description: 'The created product id',
    type: String,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProduct(@Body() product: CreateProductRequestModel) {
    const { name, description, price, stock, parentId, categoryId } = product;

    const { id } = await this.commandBus.execute(
      new CreateProductCommand({ name, description, price, stock, parentId, categoryId })
    );
    return id;
  }
}
