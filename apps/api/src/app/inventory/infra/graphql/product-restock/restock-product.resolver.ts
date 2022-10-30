import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { RestockProductCommand } from '../../../app/commands/product-restock/restock-product.command';
import { RestockProductInput } from './restock-product.input';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class RestockProductResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async restockProduct(@Args('id') productId: string, @Args('restock') restock: RestockProductInput) {
    const { stock } = restock;

    const { id } = await this.commandBus.execute(new RestockProductCommand({ productId, stock }));
    return id;
  }
}
