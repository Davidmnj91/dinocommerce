import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Entity,
  Index,
  Property,
} from '@mikro-orm/core';

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
