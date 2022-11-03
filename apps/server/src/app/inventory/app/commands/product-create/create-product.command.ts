import { IsNotEmpty } from 'class-validator';

import { ProductCreatedEvent } from '@dinocommerce/events';

import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

export class CreateProductCommand extends Command<ProductCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly price?: number;

  readonly media?: any;

  readonly parentId?: string;

  readonly categoryId?: string;

  constructor({ name, description, price, media, parentId, categoryId }: OwnCommandProps<CreateProductCommand>) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.media = media;
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
