import { Cascade, Collection, Entity, Index, LoadStrategy, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { AbstractEntity, OwnEntityProps } from '../../shared/database/base.entity';
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

  @Property({ nullable: true })
  stock?: number;

  @OneToMany(() => Media, (media) => media.product, {
    nullable: true,
    strategy: LoadStrategy.JOINED,
    cascade: [Cascade.REMOVE],
  })
  media? = new Collection<Media>(this);

  @Property({ type: 'uuid', nullable: true })
  @Index()
  parentId?: string;

  @ManyToOne(() => ProductCategory, { nullable: true, mapToPk: true })
  categoryId?: string;

  constructor({ name, description, price, stock, media, parentId, categoryId }: OwnEntityProps<Product>) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.media.add(...media);
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
