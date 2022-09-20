import { Entity, Index, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { AbstractEntity } from '../../shared/base.entity';

@Entity()
export class ProductCategory extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  @Index()
  parentId: ObjectId;

  constructor(name: string, description: string, parentId?: string) {
    super();
    this.name = name;
    this.description = description;
    this.parentId = parentId && new ObjectId(parentId);
  }
}
