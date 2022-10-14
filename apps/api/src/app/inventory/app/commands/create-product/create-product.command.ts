import { ProductCreatedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class CreateProductCommand extends Command<ProductCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly price?: number;

  readonly stock?: number;

  readonly media?: any;

  readonly parentId?: string;

  constructor(name: string, description: string, price?: number, stock?: number, media?: any, parentId?: string) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.media = media;
    this.parentId = parentId;
  }
}
