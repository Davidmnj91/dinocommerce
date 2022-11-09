import { IsNotEmpty } from 'class-validator';

import { ProductCategoryUpdatedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class UpdateProductCategoryCommand extends Command<ProductCategoryUpdatedEvent> {
  @IsNotEmpty()
  readonly productCategoryId: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly parentId?: string;

  constructor({ productCategoryId, name, description, parentId }: OwnCommandProps<UpdateProductCategoryCommand>) {
    super();
    this.productCategoryId = productCategoryId;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
