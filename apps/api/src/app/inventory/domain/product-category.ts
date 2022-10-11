import { Entity, Index, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../../shared/base.entity';

@Entity()
export class ProductCategory extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ type: 'uuid', nullable: true })
  @Index()
  parentId: string;

  constructor(name: string, description: string, parentId?: string) {
    super();
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
