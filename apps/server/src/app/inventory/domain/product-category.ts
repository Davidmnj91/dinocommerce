import { Entity, Index, Property } from '@mikro-orm/core';
import { AbstractEntity, OwnEntityProps } from '../../shared/database/base.entity';

@Entity()
export class ProductCategory extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Index()
  @Property({ type: 'uuid', nullable: true })
  parentId: string;

  constructor({ name, description, parentId }: OwnEntityProps<ProductCategory>) {
    super();
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
