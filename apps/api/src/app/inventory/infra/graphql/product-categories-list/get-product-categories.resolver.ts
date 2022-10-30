import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductCategoriesQuery } from '../../../app/queries/product-categories-get/get-product-categories.query';
import { ProductCategoryViewModel } from '../common/models/product-category.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/categories')
export class GetProductCategoriesResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductCategoryViewModel)
  async getProductCategories(): Promise<ProductCategoryViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductCategoriesQuery());
    return plainToClass(Array<ProductCategoryViewModel>, queryModel);
  }
}
