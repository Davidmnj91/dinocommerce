export class ProductCategoryQueryModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parentId: string;
  readonly children?: ProductCategoryQueryModel[];

  constructor(id: string, name: string, description: string, parentId: string, children?: ProductCategoryQueryModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
    this.children = children;
  }
}
