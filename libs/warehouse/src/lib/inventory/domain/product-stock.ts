import {
  AbstractEntity,
  OwnEntityProps,
} from '@dinocommerce/shared';
import {
  Entity,
  Index,
  OneToOne,
  Property,
} from '@mikro-orm/core';

import { Product } from './product';

@Entity()
export class ProductStock extends AbstractEntity {
  @Index()
  @OneToOne(() => Product)
  productId: Product;

  @Property()
  stock: number;

  constructor({ productId, stock }: OwnEntityProps<ProductStock>) {
    super();
    this.productId = productId;
    this.stock = stock;
  }
}
