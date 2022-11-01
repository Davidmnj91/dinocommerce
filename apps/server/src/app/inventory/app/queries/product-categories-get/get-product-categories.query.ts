import { QueryExpression } from '@dinocommerce/server-api';

import { Query } from '../../../../shared/cqrs';
import { OwnEntityProps } from '../../../../shared/database/base.entity';
import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoryQueryModel } from '../common/prodcut-category.query-model';

export class GetProductCategoriesQuery extends Query<ProductCategoryQueryModel[]> {
  readonly query: QueryExpression<OwnEntityProps<ProductCategory>>;

  constructor(query: QueryExpression<OwnEntityProps<ProductCategory>>) {
    super();
    this.query = query;
  }
}
