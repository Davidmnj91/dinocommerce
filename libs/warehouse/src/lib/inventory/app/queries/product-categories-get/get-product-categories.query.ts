import { QueryExpression } from '@dinocommerce/server-api';
import {
  OwnEntityProps,
  Query,
} from '@dinocommerce/shared';

import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoryQueryModel } from '../common/prodcut-category.query-model';

export class GetProductCategoriesQuery extends Query<ProductCategoryQueryModel[]> {
  readonly query: QueryExpression<OwnEntityProps<ProductCategory>>;

  constructor(query: QueryExpression<OwnEntityProps<ProductCategory>>) {
    super();
    this.query = query;
  }
}
