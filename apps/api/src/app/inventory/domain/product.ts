import { Entity, Index, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { AbstractEntity } from '../../shared/base.entity';
import { Media } from './media';

@Entity()
export class Product extends AbstractEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  price: number;

  @Property({ nullable: true })
  stock: number;

  @Property({ nullable: true })
  media: Media[];

  @Property({ nullable: true })
  @Index()
  parentId: ObjectId;

  constructor(name: string, description: string, price: number, stock: number, media: Media[], parentId: ObjectId) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.media = media;
    this.parentId = parentId;
  }
}
