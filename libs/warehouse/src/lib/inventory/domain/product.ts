import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Cascade,
  Collection,
  Entity,
  Index,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { Media } from './media';
import { ProductCategory } from './product-category';

@Entity()
export class Product extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  price?: number;

  @OneToMany(() => Media, (media) => media.product, {
    nullable: true,
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
    eager: true,
  })
  media? = new Collection<Media>(this);

  @Index()
  @Property({ type: 'uuid', nullable: true })
  parentId?: string;

  @Index()
  @ManyToOne(() => ProductCategory, { nullable: true, mapToPk: true })
  categoryId?: string;

  constructor({ name, description, price, parentId, categoryId }: OwnEntityProps<Product>) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
