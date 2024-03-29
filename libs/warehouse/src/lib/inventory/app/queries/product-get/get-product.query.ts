import { Query } from '@dinocommerce/shared';

import { ProductQueryModel } from '../common/product.query.model';

export class GetProductQuery extends Query<ProductQueryModel> {
  readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
