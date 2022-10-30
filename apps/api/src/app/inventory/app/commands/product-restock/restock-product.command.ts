import { ProductStockUpdatedEvent } from '@dinocommerce/events';
import { Command, OwnCommandProps } from '../../../../shared/cqrs';

export class RestockProductCommand extends Command<ProductStockUpdatedEvent> {
  readonly productId: string;
  readonly stock: number;

  constructor({ productId, stock }: OwnCommandProps<RestockProductCommand>) {
    super();
    this.productId = productId;
    this.stock = stock;
  }
}
