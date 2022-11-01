import { Expose } from 'class-transformer';

export class ProductCategoryQueryModel {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string;
  @Expose()
  readonly parentId: string;
  @Expose()
  readonly children?: ProductCategoryQueryModel[];

  constructor(id: string, name: string, description: string, parentId: string, children?: ProductCategoryQueryModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
    this.children = children;
  }
}
