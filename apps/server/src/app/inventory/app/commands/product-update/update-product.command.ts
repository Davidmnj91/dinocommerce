import { IsNotEmpty } from 'class-validator';

import { ProductUpdatedEvent } from '@dinocommerce/events';

import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

export class UpdateProductCommand extends Command<ProductUpdatedEvent> {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly price?: number;

  readonly parentId?: string;

  readonly categoryId?: string;

  constructor({ productId, name, description, price, parentId, categoryId }: OwnCommandProps<UpdateProductCommand>) {
    super();
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.parentId = parentId;
    this.categoryId = categoryId;
  }
}
