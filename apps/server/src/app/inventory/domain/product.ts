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

import {
  AbstractEntity,
  OwnEntityProps,
} from '../../shared/database/base.entity';
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

  constructor({ name, description, price, media, parentId, categoryId }: OwnEntityProps<Product>) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    if (media) {
      this.media.add(...media);
    }
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
