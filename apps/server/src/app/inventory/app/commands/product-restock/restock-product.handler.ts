import { ProductStockUpdatedEvent } from '@dinocommerce/events';
import {
  CommandHandler,
  EventBus,
  IInferredCommandHandler,
} from '@nestjs/cqrs';

import { ProductStock } from '../../../domain/product-stock';
import { ProductStockDomainService } from '../../../domain/product-stock.service';
import { ProductDomainService } from '../../../domain/product.service';
import { RestockProductCommand } from './restock-product.command';

@CommandHandler(RestockProductCommand)
export class RestockProductCommandHandler implements IInferredCommandHandler<RestockProductCommand> {
  constructor(
    private domainService: ProductStockDomainService,
    private productDomainService: ProductDomainService,
    private eventBus: EventBus
  ) {}

  async execute(command: RestockProductCommand): Promise<ProductStockUpdatedEvent> {
    const { productId, stock } = command;

    const product = await this.productDomainService.findProductById(productId);
    const currentStock = await this.domainService.findStockByProductId(productId);

    let updated;
    if (!currentStock) {
      updated = await this.domainService.saveStock(new ProductStock({ productId: product, stock }));
    } else {
      updated = await this.domainService.updateStock(currentStock, { stock: stock + currentStock?.stock });
    }

    const event = new ProductStockUpdatedEvent(updated.id, updated.stock);
    this.eventBus.publish(event);

    return event;
  }
}
