import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { UpdateProductCategoryCommand } from '../../../../app/commands/update-product-category/update-product-category.command';
import { UpdateProductCategoryDto } from './update-product-category.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class UpdateProductCategoryController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update an existing Product category' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProductCategory(
    @Param('id') productCategoryId: string,
    @Body() productCategory: UpdateProductCategoryDto
  ) {
    const { name, description, parentId } = productCategory;

    await this.commandBus.execute(new UpdateProductCategoryCommand(productCategoryId, name, description, parentId));
  }
}
