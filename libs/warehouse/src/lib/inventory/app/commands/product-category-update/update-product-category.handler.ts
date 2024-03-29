import { ProductCategoryUpdatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { UpdateProductCategoryCommand } from './update-product-category.command';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryCommandHandler implements IInferredCommandHandler<UpdateProductCategoryCommand> {
  constructor(private domainService: ProductCategoryDomainService, private eventBus: EventBus) {}

  async execute(command: UpdateProductCategoryCommand): Promise<ProductCategoryUpdatedEvent> {
    const { productCategoryId, name, description, parentId } = command;

    const existingProductCategory = await this.domainService.findProductCategoryById(productCategoryId);

    if (parentId) {
      await this.domainService.assertProductCategoryByParentId(parentId);
    }

    const updated = await this.domainService.updateProductCategory(existingProductCategory, {
      name,
      description,
      parentId,
    });

    const event = new ProductCategoryUpdatedEvent(updated.id, updated.name);
    this.eventBus.publish(event);

    return event;
  }
}
