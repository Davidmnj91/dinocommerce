import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductCategoriesQuery } from '../../../app/queries/get-product-categories/get-product-categories.query';
import { ProductCategoriesListDto } from '../../../app/queries/get-product-categories/product-categories-list.query-model';
import { ProductCategoriesListViewModel } from './product-categories-list.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/categories')
export class GetProductCategoriesResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductCategoriesListViewModel)
  async getProductCategories(): Promise<ProductCategoriesListDto> {
    return await this.queryBus.execute(new GetProductCategoriesQuery());
  }
}
