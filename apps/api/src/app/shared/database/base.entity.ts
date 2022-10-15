import { Entity, Filter, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ExcludeFunctionPropertyNames } from '../utils/excludeFunctionPropertyNames';

export type OwnEntityProps<T extends AbstractEntity> = Omit<
  T,
  keyof AbstractEntity | keyof ExcludeFunctionPropertyNames<T>
>;

@Entity({
  abstract: true,
})
@Filter({
  name: 'notDeleted',
  cond: { deletedAt: { $eq: null } },
  default: true,
})
export abstract class AbstractEntity {
  __entity?: string;

  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
