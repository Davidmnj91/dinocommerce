import { OrderExpression } from '@dinocommerce/server-api';
import { QueryBuilder } from '@mikro-orm/postgresql';

export const withOrderBy = <Entity extends object>(
  qb: QueryBuilder<Entity>,
  orderExpression?: OrderExpression<Entity>
): QueryBuilder<Entity> => {
  if (orderExpression) {
    qb.orderBy(orderExpression);
  }

  return qb;
};
