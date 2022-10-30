import { ProductUpdatedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { Product } from '../../../domain/product';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { ProductDomainService } from '../../../domain/product.service';
import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler implements IInferredCommandHandler<UpdateProductCommand> {
  constructor(
    private domainService: ProductDomainService,
    private productCategoryDomainService: ProductCategoryDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: UpdateProductCommand): Promise<ProductUpdatedEvent> {
    const { productId, name, description, parentId, categoryId } = command;

    const existingProduct = await this.domainService.findProductById(productId);

    if (parentId) {
      await this.domainService.assertProductByParentId(parentId);
    }

    if (categoryId) {
      await this.productCategoryDomainService.findProductCategoryById(categoryId);
    }

    const product = new Product({ name, description, parentId });
    const updated = await this.domainService.updateProduct(existingProduct, product);

    const event = new ProductUpdatedEvent(updated.id, updated.name);
    this.eventBus.publish(event);

    return event;
  }
}
