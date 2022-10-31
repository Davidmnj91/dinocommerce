import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportAuthGuard } from '../../../../../shared/auth';
import { UpdateProductCommand } from '../../../../app/commands/update-product/update-product.command';
import { UpdateProductDto } from './update-product.dto';

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(PassportAuthGuard)
@ApiTags('Inventory')
@Controller('inventory/products')
export class UpdateProductController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update an existing Product' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Param('id') productId: string, @Body() product: UpdateProductDto) {
    const { name, description, price, stock, parentId, categoryId } = product;

    await this.commandBus.execute(
      new UpdateProductCommand({ productId, name, description, price, stock, parentId, categoryId })
    );
  }
}
