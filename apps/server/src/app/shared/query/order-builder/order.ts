import { QueryBuilder } from '@mikro-orm/postgresql';

export type OrderOperator = 'ASC' | 'DESC';

export type OrderExpression<T> = {
  [K in keyof T]?: OrderOperator;
};

export const withOrderBy = <Entity extends object>(
  qb: QueryBuilder<Entity>,
  orderExpression?: OrderExpression<Entity>
): QueryBuilder<Entity> => {
  if (orderExpression) {
    qb.orderBy(orderExpression);
  }

  return qb;
};
