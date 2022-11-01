import { ProductStockUpdatedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { Product } from '../../../domain/product';
import { ProductDomainService } from '../../../domain/product.service';
import { RestockProductCommand } from './restock-product.command';

@CommandHandler(RestockProductCommand)
export class RestockProductCommandHandler implements IInferredCommandHandler<RestockProductCommand> {
  constructor(private domainService: ProductDomainService, private eventBus: EventBus) {}

  async execute(command: RestockProductCommand): Promise<ProductStockUpdatedEvent> {
    const { productId, stock } = command;

    const existingProduct = await this.domainService.findProductById(productId);

    const product = new Product({ ...existingProduct, stock });
    const updated = await this.domainService.updateProduct(existingProduct, product);

    const event = new ProductStockUpdatedEvent(updated.id, updated.stock);
    this.eventBus.publish(event);

    return event;
  }
}
