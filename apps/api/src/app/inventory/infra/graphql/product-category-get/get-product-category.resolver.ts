import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductCategoryQuery } from '../../../app/queries/product-category-get/get-product-category.query';
import { ProductCategoryViewModel } from '../common/models/product-category.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/categories')
export class GetProductCategoryResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductCategoryViewModel)
  async getProductCategory(@Args('id') productCategoryId: string): Promise<ProductCategoryViewModel> {
    const queryModel = await this.queryBus.execute(new GetProductCategoryQuery(productCategoryId));
    return plainToClass(ProductCategoryViewModel, queryModel);
  }
}
