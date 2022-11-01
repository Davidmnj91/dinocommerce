export type Operator = 'AND' | 'OR';
export type Operation<T> = T extends Scalar ? ScalarOperationValue<T> : OperationValue<T>;

type Scalar = number | Date;

type OperationValue<K> =
  | EqOperationValue<K>
  | NotEqOperationValue<K>
  | LikeOperationValue
  | InOperationValue<K>
  | NotInOperationValue<K>
  | IsNullOperationValue
  | IsNotNullOperationValue;

type ScalarOperationValue<K extends Scalar> =
  | GtOperationValue<K>
  | GteOperationValue<K>
  | LtOperationValue<K>
  | LteOperationValue<K>
  | IsNullOperationValue
  | IsNotNullOperationValue;

type EqOperationValue<K> = {
  type: 'EQ';
  value: K;
};
type NotEqOperationValue<K> = {
  type: 'NOT_EQ';
  value: K;
};
type LikeOperationValue = {
  type: 'LIKE';
  value: string;
};
type InOperationValue<K> = {
  type: 'IN';
  value: K[];
};
type NotInOperationValue<K> = {
  type: 'NOT_IN';
  value: K[];
};
type IsNullOperationValue = {
  type: 'IS_NULL';
};
type IsNotNullOperationValue = {
  type: 'IS_NOT_NULL';
};
type GtOperationValue<K> = {
  type: 'GT';
  value: K;
};
type GteOperationValue<K> = {
  type: 'GTE';
  value: K;
};
type LtOperationValue<K> = {
  type: 'LT';
  value: K;
};
type LteOperationValue<K> = {
  type: 'LTE';
  value: K;
};
