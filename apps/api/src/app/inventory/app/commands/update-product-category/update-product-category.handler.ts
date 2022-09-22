import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { ProductCategoryCreatedEvent } from '@dinocommerce/events';
import { ProductCategory } from '../../../domain/product-category';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { UpdateProductCategoryCommand } from './update-product-category.command';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryCommandHandler implements IInferredCommandHandler<UpdateProductCategoryCommand> {
  constructor(private domainService: ProductCategoryDomainService, private eventBus: EventBus) {}

  async execute(command: UpdateProductCategoryCommand): Promise<void> {
    const { id, name, description, parentId } = command;

    const existingProductCategory = await this.domainService.findProductCategoryById(id);

    if (parentId) {
      await this.domainService.assertProductCategoryByParentId(parentId);
    }

    const productCategory = new ProductCategory(name, description, parentId);

    await this.domainService.updateProductCategory(existingProductCategory, productCategory);

    this.eventBus.publish(new ProductCategoryCreatedEvent(productCategory.id, productCategory.name));
  }
}
