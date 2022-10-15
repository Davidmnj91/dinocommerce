import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { UpdateProductCommand } from '../../../app/commands/update-product/update-product.command';
import { UpdateProductInput } from './update-product.input';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class UpdateProductResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async updateProduct(@Args('id') productId: string, @Args('product') product: UpdateProductInput) {
    const { name, description, price, stock, parentId, categoryId } = product;

    const { id } = await this.commandBus.execute(
      new UpdateProductCommand({ productId, name, description, price, stock, parentId, categoryId })
    );
    return id;
  }
}
