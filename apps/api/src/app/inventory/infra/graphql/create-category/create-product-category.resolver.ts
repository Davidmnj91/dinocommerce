import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { CreateProductCategoryCommand } from '../../../app/commands/create-product-category/create-product-category.command';
import { CreateProductCategoryInput } from './create-product-category.input';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/categories')
export class CreateProductCategoryResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ID)
  async createProductCategory(@Args('productCategory') productCategory: CreateProductCategoryInput) {
    const { name, description, parentId } = productCategory;

    const { id } = await this.commandBus.execute(new CreateProductCategoryCommand(name, description, parentId));
    return id;
  }
}
