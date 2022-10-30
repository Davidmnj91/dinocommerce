import { Query } from '../../../../shared/cqrs';
import { ProductCategoriesListDto } from '../common/product-categories-list.query-model';

export class GetProductCategoriesQuery extends Query<ProductCategoriesListDto> {}
