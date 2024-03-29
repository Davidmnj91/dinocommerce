import {
  OperatorAuthGuard,
  Permissions,
} from '@dinocommerce/auth';
import { ProductCategoriesUpdateApi } from '@dinocommerce/warehouse-api';
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

import {
  UpdateProductCategoryCommand,
} from '../../../../app/commands/product-category-update/update-product-category.command';
import { UpdateProductCategoryRequestModel } from './update-product-category.request-model';

@ApiBearerAuth()
@ApiCookieAuth()
@Permissions({ PRODUCT: ['UPDATE'] })
@UseGuards(OperatorAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class UpdateProductCategoryController implements ProductCategoriesUpdateApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update an existing Product category' })
  @ApiResponse({
    status: 200,
    description: 'The created product category id',
    type: String,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProductCategory(
    @Param('id') productCategoryId: string,
    @Body() productCategory: UpdateProductCategoryRequestModel
  ) {
    const { name, description, parentId } = productCategory;

    const { id } = await this.commandBus.execute(
      new UpdateProductCategoryCommand({ productCategoryId, name, description, parentId })
    );
    return id;
  }
}
