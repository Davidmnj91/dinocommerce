import { FilterExpression } from './filter-builder/filter';
import { OrderExpression } from './order-builder/order';
import { PaginationExpression } from './pagination-builder/paginate';

export type QueryExpression<T> = {
  where: FilterExpression<T>;
  sort: OrderExpression<T>;
  pagination: PaginationExpression;
};
