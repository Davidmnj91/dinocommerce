import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

import { MediaType } from './media-type';
import { Product } from './product';

@Entity()
export class Media extends AbstractEntity {
  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  type: MediaType;

  @Property()
  name: string;

  @Property()
  url: string;

  @Property()
  position: number;

  constructor({ type, name, url, position }: OwnEntityProps<Media>) {
    super();
    this.type = type;
    this.name = name;
    this.url = url;
    this.position = position;
  }
}
