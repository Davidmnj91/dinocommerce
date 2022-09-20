import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWT_STRATEGY } from '../../../../../shared/auth/auth.strategies';
import { CreateProductCategoryCommand } from '../../../../app/commands/create-product-category/create-product-category.command';
import { CreateProductCategoryDto } from './create-product-category.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiTags('Inventory')
@Controller('inventory/categories')
export class CreateProductCategoryController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Product category' })
  @UseGuards(AuthGuard(JWT_STRATEGY))
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProductCategory(@Body() productCategory: CreateProductCategoryDto) {
    const { name, description, parentId } = productCategory;

    await this.commandBus.execute(new CreateProductCategoryCommand(name, description, parentId));
  }
}
