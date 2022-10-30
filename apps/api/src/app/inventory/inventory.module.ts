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
import { GetProductCategoriesResolver } from './infra/graphql/product-categories-list/get-product-categories.resolver';
import { CreateProductCategoryResolver } from './infra/graphql/product-category-create/create-product-category.resolver';
import { GetProductCategoryResolver } from './infra/graphql/product-category-get/get-product-category.resolver';
import { UpdateProductCategoryResolver } from './infra/graphql/product-category-update/update-product-category.resolver';
import { CreateProductResolver } from './infra/graphql/product-create/create-product.resolver';
import { GetProductsByCategoryIdResolver } from './infra/graphql/product-get-by-category/product-get.resolver';
import { GetProductResolver } from './infra/graphql/product-get/product-get.resolver';
import { RestockProductResolver } from './infra/graphql/product-restock/restock-product.resolver';
import { UpdateProductResolver } from './infra/graphql/product-update/update-product.resolver';
import { GetProductsResolver } from './infra/graphql/products-list/products-get.resolver';
import { UpdateProductCategoryController } from './infra/http/usecase/update-category/update-product-category.controller';
import { UpdateProductController } from './infra/http/usecase/update-product/update-product.controller';

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
const controllers = [UpdateProductCategoryController, UpdateProductController];
const resolvers = [
  CreateProductCategoryResolver,
  UpdateProductCategoryResolver,
  GetProductCategoriesResolver,
  GetProductCategoryResolver,
  CreateProductResolver,
  UpdateProductResolver,
  GetProductResolver,
  GetProductsResolver,
  GetProductsByCategoryIdResolver,
  RestockProductResolver,
];

@Module({
  imports: [MikroOrmModule.forFeature([Product, ProductCategory]), CqrsModule],
  controllers: [...controllers],
  providers: [
    ProductCategoryDomainService,
    ProductDomainService,
    PassportAuthGuard,
    ...resolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
  ],
  exports: [],
})
export class InventoryModule {}
