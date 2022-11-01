export type OrderOperator = 'ASC' | 'DESC';

export type OrderExpression<T> = {
  [K in keyof T]?: OrderOperator;
};
