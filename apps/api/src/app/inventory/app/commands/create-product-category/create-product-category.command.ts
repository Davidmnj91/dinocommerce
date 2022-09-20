import { IsNotEmpty } from 'class-validator';
import { Command } from '../../../../shared/cqrs';

export class CreateProductCategoryCommand extends Command<void> {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly parentId: string;

  constructor(name: string, description: string, parentId: string) {
    super();
    this.name = name;
    this.description = description;
    this.parentId = parentId;
  }
}
