import { FilterQuery, FindOptions } from '@mikro-orm/core';

export type Queryable<T> = {
  where: FilterQuery<T>;
  options?: FindOptions<T>;
};
