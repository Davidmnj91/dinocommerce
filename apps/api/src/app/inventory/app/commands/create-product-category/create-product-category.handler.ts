import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { ProductCategoryCreatedEvent } from '@dinocommerce/events';
import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { CreateProductCategoryCommand } from './create-product-category.command';

@CommandHandler(CreateProductCategoryCommand)
export class CreateProductCategoryCommandHandler implements IInferredCommandHandler<CreateProductCategoryCommand> {
  constructor(private domainService: ProductCategoryDomainService, private eventBus: EventBus) {}

  async execute(command: CreateProductCategoryCommand): Promise<void> {
    const { name, description, parentId } = command;

    if (parentId) {
      await this.domainService.findProductCategoryById(parentId);
    } 

    const productCategory = new ProductCategory(name, description, parentId);

    const saved = await this.domainService.saveProductCategory(productCategory);

    this.eventBus.publish(new ProductCategoryCreatedEvent(saved.id, saved.name));
  }
}
