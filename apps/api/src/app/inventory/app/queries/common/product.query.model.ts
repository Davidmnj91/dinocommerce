import { MediaQueryModel } from './media.query.model';

export class ProductQueryModel {
  readonly name: string;
  readonly description: string;
  readonly price?: number;
  readonly stock?: number;
  readonly media?: MediaQueryModel[];
  readonly parentId?: string;
  readonly categoryId?: string;

  constructor(
    name: string,
    description: string,
    price?: number,
    stock?: number,
    media?: MediaQueryModel[],
    parentId?: string,
    categoryId?: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.media = media;
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
