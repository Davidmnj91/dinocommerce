import { Query } from '../../../../shared/cqrs';
import { OwnEntityProps } from '../../../../shared/database/base.entity';
import { QueryExpression } from '../../../../shared/query/queryable.dto';
import { ProductCategory } from '../../../domain/product-category';
import { ProductQueryModel } from '../common/product.query.model';

export class GetProductsQuery extends Query<ProductQueryModel[]> {
  readonly query: QueryExpression<OwnEntityProps<ProductCategory>>;

  constructor(query: QueryExpression<OwnEntityProps<ProductCategory>>) {
    super();
    this.query = query;
  }
}
