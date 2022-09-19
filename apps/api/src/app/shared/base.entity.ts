import { Filter, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: { $eq: null } },
  default: true,
})
export abstract class AbstractEntity {
  __entity?: string;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property({ name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
