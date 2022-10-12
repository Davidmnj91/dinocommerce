import { ProductCategoryUpdatedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class UpdateProductCategoryCommand extends Command<ProductCategoryUpdatedEvent> {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly parentId?: string;

  constructor(id: string, name: string, description: string, parentId?: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
