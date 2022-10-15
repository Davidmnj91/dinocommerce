import { IQuery } from '@nestjs/cqrs';
import { ExcludeFunctionPropertyNames } from '../utils/excludeFunctionPropertyNames';

export type OwnQueryProps<T extends Query<unknown>> = Omit<
  T,
  keyof Query<unknown> | keyof ExcludeFunctionPropertyNames<T>
>;
export class Query<T> implements IQuery {
  resultType$f9fbca36!: T;
}
