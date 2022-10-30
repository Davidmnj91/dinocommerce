import { IsNotEmpty } from 'class-validator';
import { Query } from '../../../../shared/cqrs';
import { ProductCategoryQueryModel } from '../common/prodcut-category.query-model';

export class GetProductCategoryQuery extends Query<ProductCategoryQueryModel> {
  @IsNotEmpty()
  readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
