import { Expose } from 'class-transformer';
import { MediaQueryModel } from './media.query.model';

export class ProductQueryModel {
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string;
  @Expose()
  readonly price?: number;
  @Expose()
  readonly stock?: number;
  @Expose()
  readonly media?: MediaQueryModel[];
  @Expose()
  readonly parentId?: string;
  @Expose()
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
