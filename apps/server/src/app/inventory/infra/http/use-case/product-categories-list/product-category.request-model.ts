import { OwnEntityProps } from '../../../../../shared/database/base.entity';
import { QueryExpression } from '../../../../../shared/query/queryable.dto';
import { ProductCategory } from '../../../../domain/product-category';

export type QueryProductCategoriesRequestModel = QueryExpression<OwnEntityProps<ProductCategory>>;
