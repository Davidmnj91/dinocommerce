import { Field, ObjectType } from '@nestjs/graphql';
import { ProductCategoryViewModel } from './product-category.view-model';

@ObjectType()
export class ProductCategoriesListViewModel {
  @Field(() => [ProductCategoryViewModel])
  readonly categories: ProductCategoryViewModel[];
}
