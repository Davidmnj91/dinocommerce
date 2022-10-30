import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductByCategoryQuery } from '../../../app/queries/product-get -by-category/get-product-by-category.query';
import { ProductViewModel } from '../common/models/product.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class GetProductsByCategoryIdResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductViewModel)
  async getProductsByCategory(@Args('categoryId') productCategoryId: string): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductByCategoryQuery(productCategoryId));
    return plainToInstance(ProductViewModel, queryModel);
  }
}
