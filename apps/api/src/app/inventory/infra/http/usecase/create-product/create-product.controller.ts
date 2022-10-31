import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { CreateProductCommand } from '../../../../app/commands/create-product/create-product.command';
import { CreateProductDto } from './create-product.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class CreateProductController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create new Product' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProduct(@Body() product: CreateProductDto) {
    const { name, description, price, stock, parentId, categoryId } = product;

    await this.commandBus.execute(new CreateProductCommand({ name, description, price, stock, parentId, categoryId }));
  }
}
