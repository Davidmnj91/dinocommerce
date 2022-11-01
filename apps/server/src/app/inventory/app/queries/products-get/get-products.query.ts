import { QueryExpression } from '@dinocommerce/server-api';

import { Query } from '../../../../shared/cqrs';
import { OwnEntityProps } from '../../../../shared/database/base.entity';
import { ProductCategory } from '../../../domain/product-category';
import { ProductQueryModel } from '../common/product.query.model';

export class GetProductsQuery extends Query<ProductQueryModel[]> {
  readonly query: QueryExpression<OwnEntityProps<ProductCategory>>;

  constructor(query: QueryExpression<OwnEntityProps<ProductCategory>>) {
    super();
    this.query = query;
  }
}
