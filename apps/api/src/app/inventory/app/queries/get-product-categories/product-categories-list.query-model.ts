import { ProductCategoryQueryModel } from "../common/prodcut-category.query-model";

export class ProductCategoriesListDto {
  readonly categories: ProductCategoryQueryModel[];

  constructor(categories: ProductCategoryQueryModel[]) {
    this.categories = categories;
  }
}