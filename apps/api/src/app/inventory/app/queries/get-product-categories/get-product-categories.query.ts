import { OwnEntityProps } from 'apps/api/src/app/shared/database/base.entity';
import { Queryable } from 'apps/api/src/app/shared/query/queryable.dto';
import { Query } from '../../../../shared/cqrs';
import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoriesListDto } from './product-categories-list.query-model';

export class GetProductCategoriesQuery extends Query<ProductCategoriesListDto> {
  productCategoryQuery: Queryable<OwnEntityProps<ProductCategory>>;

  constructor(productCategoryQuery: Queryable<OwnEntityProps<ProductCategory>>) {
    super();
    this.productCategoryQuery = productCategoryQuery;
  }
}
