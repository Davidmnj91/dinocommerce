import { Query } from '@dinocommerce/shared';

import { ProductQueryModel } from '../common/product.query.model';

export class GetProductByCategoryQuery extends Query<ProductQueryModel[]> {
  readonly productCategoryId: string;

  constructor(productCategoryId: string) {
    super();
    this.productCategoryId = productCategoryId;
  }
}
