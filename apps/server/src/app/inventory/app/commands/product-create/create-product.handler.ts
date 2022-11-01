import { ProductCreatedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { Product } from '../../../domain/product';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { ProductDomainService } from '../../../domain/product.service';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements IInferredCommandHandler<CreateProductCommand> {
  constructor(
    private domainService: ProductDomainService,
    private productCategoryDomainService: ProductCategoryDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductCreatedEvent> {
    const { name, description, price, stock, media, parentId, categoryId } = command;

    if (parentId) {
      await this.domainService.findProductById(parentId);
    }

    if (categoryId) {
      await this.productCategoryDomainService.findProductCategoryById(categoryId);
    }

    const product = new Product({ name, description, price, stock, media, parentId, categoryId });
    const saved = await this.domainService.saveProduct(product);

    const event = new ProductCreatedEvent(saved.id, saved.name);
    this.eventBus.publish(event);

    return event;
  }
}
