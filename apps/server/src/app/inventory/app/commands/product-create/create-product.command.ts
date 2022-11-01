import { ProductCreatedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

export class CreateProductCommand extends Command<ProductCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly price?: number;

  readonly stock?: number;

  readonly media?: any;

  readonly parentId?: string;

  readonly categoryId?: string;

  constructor({ name, description, price, stock, media, parentId, categoryId }: OwnCommandProps<CreateProductCommand>) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.media = media;
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
