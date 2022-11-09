import { IsNotEmpty } from 'class-validator';

import { ProductCategoryCreatedEvent } from '@dinocommerce/events';
import {
  Command,
  OwnCommandProps,
} from '@dinocommerce/shared';

export class CreateProductCategoryCommand extends Command<ProductCategoryCreatedEvent> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly parentId?: string;

  constructor({ name, description, parentId }: OwnCommandProps<CreateProductCategoryCommand>) {
    super();
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
