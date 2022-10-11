export class ProductCategoryQueryModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parentId: string;
  readonly children?: ProductCategoryQueryModel[];
}
