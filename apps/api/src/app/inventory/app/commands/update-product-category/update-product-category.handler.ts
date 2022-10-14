import { ProductCategoryCreatedEvent, ProductCategoryUpdatedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { UpdateProductCategoryCommand } from './update-product-category.command';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryCommandHandler implements IInferredCommandHandler<UpdateProductCategoryCommand> {
  constructor(private domainService: ProductCategoryDomainService, private eventBus: EventBus) {}

  async execute(command: UpdateProductCategoryCommand): Promise<ProductCategoryUpdatedEvent> {
    const { id, name, description, parentId } = command;

    const existingProductCategory = await this.domainService.findProductCategoryById(id);

    if (parentId) {
      await this.domainService.assertProductCategoryByParentId(parentId);
    }

    const productCategory = new ProductCategory({ name, description, parentId });
    const updated = await this.domainService.updateProductCategory(existingProductCategory, productCategory);

    const event = new ProductCategoryCreatedEvent(updated.id, updated.name);
    this.eventBus.publish(event);

    return event;
  }
}
