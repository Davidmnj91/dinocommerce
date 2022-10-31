import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportAuthGuard } from '../shared/auth';
import { CreateProductCategoryCommandHandler } from './app/commands/product-category-create/create-product-category.handler';
import { UpdateProductCategoryCommandHandler } from './app/commands/product-category-update/update-product-category.handler';
import { CreateProductCommandHandler } from './app/commands/product-create/create-product.handler';
import { RestockProductCommandHandler } from './app/commands/product-restock/restock-product.handler';
import { UpdateProductCommandHandler } from './app/commands/product-update/update-product.handler';
import { GetProductCategoriesQueryHandler } from './app/queries/product-categories-get/get-product-categories.handler';
import { GetProductCategoryQueryHandler } from './app/queries/product-category-get/get-product-category.handler';
import { GetProductByCategoryQueryQueryHandler } from './app/queries/product-get -by-category/get-product-by-category.handler';
import { GetProductQueryHandler } from './app/queries/product-get/get-product.handler';
import { GetProductsQueryHandler } from './app/queries/products-get/get-products.handler';
import { Product } from './domain/product';
import { ProductCategory } from './domain/product-category';
import { ProductCategoryDomainService } from './domain/product-category.service';
import { ProductDomainService } from './domain/product.service';
import { GetProductCategoriesController } from './infra/http/use-case/product-categories-list/get-product-categories.controller';
import { CreateProductCategoryController } from './infra/http/use-case/product-category-create/create-product-category.controller';
import { GetProductCategoryController } from './infra/http/use-case/product-category-get/get-product-category.controller';
import { UpdateProductCategoryController } from './infra/http/use-case/product-category-update/update-product-category.controller';
import { CreateProductController } from './infra/http/use-case/product-create/create-product.controller';
import { GetProductsByCategoryIdController } from './infra/http/use-case/product-get-by-category/product-get.controller';
import { GetProductController } from './infra/http/use-case/product-get/product-get.controller';
import { RestockProductController } from './infra/http/use-case/product-restock/restock-product.controller';
import { UpdateProductController } from './infra/http/use-case/product-update/update-product.controller';
import { GetProductsController } from './infra/http/use-case/products-list/products-get.controller';

const commandHandlers = [
  CreateProductCategoryCommandHandler,
  UpdateProductCategoryCommandHandler,
  CreateProductCommandHandler,
  UpdateProductCommandHandler,
  RestockProductCommandHandler,
];
const queryHandlers = [
  GetProductCategoriesQueryHandler,
  GetProductCategoryQueryHandler,
  GetProductsQueryHandler,
  GetProductQueryHandler,
  GetProductByCategoryQueryQueryHandler,
];
const eventHandlers = [];
const controllers = [
  CreateProductCategoryController,
  UpdateProductCategoryController,
  GetProductCategoriesController,
  GetProductCategoryController,
  CreateProductController,
  UpdateProductController,
  GetProductController,
  GetProductsController,
  GetProductsByCategoryIdController,
  RestockProductController,
];

@Module({
  imports: [MikroOrmModule.forFeature([Product, ProductCategory]), CqrsModule],
  controllers: [...controllers],
  providers: [
    ProductCategoryDomainService,
    ProductDomainService,
    PassportAuthGuard,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
  ],
  exports: [],
})
export class InventoryModule {}
