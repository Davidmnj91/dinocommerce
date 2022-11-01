import { QueryBuilder } from '@mikro-orm/postgresql';

export type PaginationExpression = {
  limit?: number;
  offset?: number;
};

export const withPagination = <Entity extends object>(
  qb: QueryBuilder<Entity>,
  paginationExpression?: PaginationExpression
) => {
  if (!paginationExpression) {
    return qb;
  }
  const { limit, offset } = paginationExpression;
  if (limit) {
    qb.limit(limit);
  }
  if (offset) {
    qb.offset(offset);
  }

  return qb;
};
