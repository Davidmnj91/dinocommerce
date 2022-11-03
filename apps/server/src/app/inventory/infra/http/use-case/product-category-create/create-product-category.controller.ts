import { ProductCategoryCreateApi } from '@dinocommerce/server-api';
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
import {
  CreateProductCategoryCommand,
} from '../../../../app/commands/product-category-create/create-product-category.command';
import { CreateProductCategoryRequestModel } from './create-product-category.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(new PassportAuthGuard('ADMINISTRATOR'))
@ApiTags('Inventory')
@Controller('inventory/categories')
export class CreateProductCategoryController implements ProductCategoryCreateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Product category' })
  @ApiResponse({
    status: 200,
    description: 'The created product category id',
    type: String,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProductCategory(@Body() productCategory: CreateProductCategoryRequestModel) {
    const { name, description, parentId } = productCategory;

    const { id } = await this.commandBus.execute(new CreateProductCategoryCommand({ name, description, parentId }));
    return id;
  }
}