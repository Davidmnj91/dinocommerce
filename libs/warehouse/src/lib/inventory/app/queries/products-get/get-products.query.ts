import {
  OwnEntityProps,
  Query,
} from '@dinocommerce/shared';
import { QueryExpression } from '@dinocommerce/warehouse-api';

import { ProductCategory } from '../../../domain/product-category';
import { ProductQueryModel } from '../common/product.query.model';

export class GetProductsQuery extends Query<ProductQueryModel[]> {
  readonly query: QueryExpression<OwnEntityProps<ProductCategory>>;

  constructor(query: QueryExpression<OwnEntityProps<ProductCategory>>) {
    super();
    this.query = query;
  }
}
