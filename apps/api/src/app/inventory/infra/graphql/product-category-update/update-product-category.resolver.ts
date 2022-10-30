import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { UpdateProductCategoryCommand } from '../../../app/commands/product-category-update/update-product-category.command';
import { UpdateProductCategoryInput } from './update-product-category.input';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/categories')
export class UpdateProductCategoryResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async updateProductCategory(
    @Args('id') productCategoryId: string,
    @Args('productCategory') productCategory: UpdateProductCategoryInput
  ) {
    const { name, description, parentId } = productCategory;

    const { id } = await this.commandBus.execute(
      new UpdateProductCategoryCommand({ productCategoryId, name, description, parentId })
    );
    return id;
  }
}
