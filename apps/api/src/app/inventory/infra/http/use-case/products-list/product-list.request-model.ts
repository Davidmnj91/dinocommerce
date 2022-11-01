import { OwnEntityProps } from '../../../../../shared/database/base.entity';
import { QueryExpression } from '../../../../../shared/query/queryable.dto';
import { Product } from '../../../../domain/product';

export type QueryProductsRequestModel = QueryExpression<OwnEntityProps<Product>>;
