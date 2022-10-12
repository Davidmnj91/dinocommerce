import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { CreateProductCategoryCommand } from '../../../../app/commands/create-product-category/create-product-category.command';
import { CreateProductCategoryDto } from './create-product-category.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/categories')
export class CreateProductCategoryController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Product category' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProductCategory(@Body() productCategory: CreateProductCategoryDto) {
    const { name, description, parentId } = productCategory;

    await this.commandBus.execute(new CreateProductCategoryCommand(name, description, parentId));
  }
}
