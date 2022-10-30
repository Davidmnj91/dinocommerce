import { Query } from '../../../../shared/cqrs';
import { ProductQueryModel } from '../common/product.query.model';

export class GetProductsQuery extends Query<ProductQueryModel[]> {}
