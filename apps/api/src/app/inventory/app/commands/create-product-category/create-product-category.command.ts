import { ProductCategoryCreatedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

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
