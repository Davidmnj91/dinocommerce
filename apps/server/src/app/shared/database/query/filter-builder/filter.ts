import {
  FilterExpression,
  Operation,
} from '@dinocommerce/server-api';
import { QueryBuilder } from '@mikro-orm/postgresql';

export const withWhereClause = <Entity extends object>(
  qb: QueryBuilder<Entity>,
  filtersExpression?: FilterExpression<Entity>
) => {
  if (filtersExpression) {
    buildWhere<Entity>(qb, filtersExpression);
  }

  return qb;
};

export const buildWhere = <Entity extends object>(
  qb: QueryBuilder<Entity>,
  filtersExpression?: FilterExpression<Entity>
) => {
  const params: { [K in keyof Entity]?: Entity[K] } = {};
  let paramsCount = 0;

  const buildExpressionRecursive = (fe: FilterExpression<Entity>): string => {
    const { operator, filters, childExpressions } = fe;
    const queries = Object.keys(filters).map((f: keyof Entity & string) => buildFilter(f, filters[f]));
    const children = childExpressions.map((child) => buildExpressionRecursive(child));

    const allSqlBlocks = [...queries, ...children];
    const sqLExpr = allSqlBlocks.join(` ${operator} `);
    return sqLExpr.trim() ? '' : `(${sqLExpr})`;
  };

  const buildFilter = <Entity, K extends keyof Entity>(field: K & string, filter: Operation<Entity[K]>): string => {
    const paramName = `${field}_${++paramsCount}`;

    switch (filter.type) {
      case 'EQ':
        params[paramName] = filter.value;
        return `${field} = :${paramName}`;
      case 'NOT_EQ':
        params[paramName] = filter.value;
        return `${field} != :${paramName}`;
      case 'LIKE':
        params[paramName] = `%${filter.value}%`;
        return `${field} LIKE :${paramName}`;
      case 'IN':
        params[paramName] = filter.value;
        return `${field} IN (:${paramName})`;
      case 'NOT_IN':
        params[paramName] = filter.value;
        return `${field} NOT IN (:${paramName})`;
      case 'IS_NULL':
        return `${field} IS NULL`;
      case 'IS_NOT_NULL':
        return `${field} IS NOT NULL`;
      case 'GT':
        params[paramName] = filter.value;
        return `${field} > :${paramName}`;
      case 'GTE':
        params[paramName] = filter.value;
        return `${field} >= :${paramName}`;
      case 'LT':
        params[paramName] = filter.value;
        return `${field} < :${paramName}`;
      case 'LTE':
        params[paramName] = filter.value;
        return `${field} <= :${paramName}`;
      default:
        throw new Error(`Unknown filter operation: ${filter}`);
    }
  };

  const condition = buildExpressionRecursive(filtersExpression);
  return qb.where(condition, Object.values(params));
};
