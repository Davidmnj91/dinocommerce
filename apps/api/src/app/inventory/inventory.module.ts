import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductCategoryCommandHandler } from './app/commands/create-product-category/create-product-category.handler';
import { UpdateProductCategoryCommandHandler } from './app/commands/update-product-category/update-product-category.handler';
import { GetProductCategoriesQueryHanlder } from './app/queries/get-product-categories/get-product-categories.handler';
import { Product } from './domain/product';
import { ProductCategory } from './domain/product-category';
import { ProductCategoryDomainService } from './domain/product-category.service';
import { CreateProductCategoryController } from './infra/http/usecase/create-category/create-product-category.controller';
import { GetProductCategoriesController } from './infra/http/usecase/get-categories/get-product-categories.controller';
import { UpdateProductCategoryController } from './infra/http/usecase/update-category/update-product-category.controller';

const commandHandlers = [CreateProductCategoryCommandHandler, UpdateProductCategoryCommandHandler];
const queryHandlers = [GetProductCategoriesQueryHanlder];
const eventHandlers = [];
const controllers = [CreateProductCategoryController, UpdateProductCategoryController, GetProductCategoriesController];

@Module({
  imports: [MikroOrmModule.forFeature([Product, ProductCategory]), CqrsModule],
  controllers: [...controllers],
  providers: [ProductCategoryDomainService, ...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [],
})
export class InventoryModule {}
