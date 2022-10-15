import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { CreateProductCommand } from '../../../app/commands/create-product/create-product.command';
import { CreateProductInput } from './create-product.input';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class CreateProductResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async createProduct(@Args('product') product: CreateProductInput) {
    const { name, description, price, stock, parentId, categoryId } = product;

    const { id } = await this.commandBus.execute(
      new CreateProductCommand({ name, description, price, stock, parentId, categoryId })
    );
    return id;
  }
}
