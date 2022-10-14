import { ProductCreatedEvent } from '@dinocommerce/events';
import { CommandHandler, EventBus, IInferredCommandHandler } from '@nestjs/cqrs';
import { Product } from '../../../domain/product';
import { ProductDomainService } from '../../../domain/product.service';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements IInferredCommandHandler<CreateProductCommand> {
  constructor(private domainService: ProductDomainService, private eventBus: EventBus) {}

  async execute(command: CreateProductCommand): Promise<ProductCreatedEvent> {
    const { name, description, price, stock, media, parentId } = command;

    if (parentId) {
      await this.domainService.findProductById(parentId);
    }

    const product = new Product({ name, description, price, stock, media, parentId });
    const saved = await this.domainService.saveProduct(product);

    const event = new ProductCreatedEvent(saved.id, saved.name);
    this.eventBus.publish(event);

    return event;
  }
}
