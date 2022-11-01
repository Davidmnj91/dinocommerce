import { QueryExpression } from '@dinocommerce/server-api';
import { EntityRepository } from '@mikro-orm/postgresql';

import { withWhereClause } from './filter-builder/filter';
import { withOrderBy } from './order-builder/order';
import { withPagination } from './pagination-builder/paginate';

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
