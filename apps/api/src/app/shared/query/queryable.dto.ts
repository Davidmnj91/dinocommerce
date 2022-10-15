import { FilterQuery } from '@mikro-orm/core';
import { ExpandScalar, OperatorMap, Query } from '@mikro-orm/core/typings';

type Scalar = number | Date;
type Operator = ScalarOperatorValue<any>['type'] | OperatorValue<unknown>['type'];
type OperatorValue<K> = EqOperatorValue<K> | NotEqOperatorValue<K> | InOperatorValue<K> | NotInOperatorValue<K>;
type ScalarOperatorValue<K extends Scalar> =
  | GtOperatorValue<K>
  | GteOperatorValue<K>
  | LtOperatorValue<K>
  | LteOperatorValue<K>;

type EqOperatorValue<K> = {
  type: 'EQ';
  value: K;
};
type NotEqOperatorValue<K> = {
  type: 'NOT_EQ';
  value: K;
};
type GtOperatorValue<K> = {
  type: 'GT';
  value: K;
};
type GteOperatorValue<K> = {
  type: 'GTE';
  value: K;
};
type LtOperatorValue<K> = {
  type: 'LT';
  value: K;
};
type LteOperatorValue<K> = {
  type: 'LTE';
  value: K;
};
type InOperatorValue<K> = {
  type: 'IN';
  value: K[];
};
type NotInOperatorValue<K> = {
  type: 'NOT_IN';
  value: K[];
};

export type Queryable<T> = {
  [K in keyof T]?: T[K] extends Scalar ? ScalarOperatorValue<T[K]> : OperatorValue<T[K]>;
};

export const toMiKroOrmQUery = <T>(query: Queryable<T>): FilterQuery<T> => {
  let filterQuery: Query<T>[] = [];

  Object.keys(query).forEach((key: keyof Queryable<T>) => {
    const { type, value } = query[key];

    filterQuery.push({ key: query[key] });
  });

  return { $or: filterQuery };
};

type test<T> = {
  [K in keyof OperatorMap<T>]: OperatorMap<T>[K] extends ExpandScalar<T> | ExpandScalar<T>[] ? K : never;
}[keyof OperatorMap<T>];

const t: test<any> = {};
type PickMikroOrmScalarTypes<T> = Pick<
  OperatorMap<T>,
  {
    [K in keyof OperatorMap<T>]: OperatorMap<T>[K] extends ExpandScalar<T> ? never : K;
  }[keyof T]
>;
export const toMikroOrmOperator = <T>(operator: Operator): PickMikroOrmScalarTypes<T> => {
  switch (operator) {
    case 'EQ':
      return '$eq';
  }
};
