import { ProductCategoryUpdatedEvent } from '@dinocommerce/events';
import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';
import { OwnCommandProps } from '../../../../shared/cqrs/command';

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
