import { EntityRepository } from '@mikro-orm/postgresql';
import { FilterExpression, withWhereClause } from './filter-builder/filter';
import { OrderExpression, withOrderBy } from './order-builder/order';
import { PaginationExpression, withPagination } from './pagination-builder/paginate';

export type QueryExpression<T> = {
  where: FilterExpression<T>;
  sort: OrderExpression<T>;
  pagination: PaginationExpression;
};

export const buildQuery = <Entity extends object>(
  entityRepository: EntityRepository<Entity>,
  queryExpression?: QueryExpression<Entity>
) => {
  const qb = entityRepository.createQueryBuilder();
  if (!queryExpression) {
    return qb.execute() as Promise<Entity[]>;
  }
  const { where, sort, pagination } = queryExpression;

  withWhereClause(qb, where);
  withOrderBy(qb, sort);
  withPagination(qb, pagination);

  return qb.execute() as Promise<Entity[]>;
};
