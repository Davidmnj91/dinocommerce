import { Operation, Operator } from './operations';

type Filter<T> = {
  [K in keyof T]?: Operation<T[K]>;
};

export type FilterExpression<T> = {
  operator: Operator;
  filters: Filter<T>;
  childExpressions?: FilterExpression<T>[];
};
