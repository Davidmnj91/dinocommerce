import { IsNotEmpty } from 'class-validator';

export class ProductStockUpdatedEvent {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly stock: number;

  constructor(id: string, stock: number) {
    this.id = id;
    this.stock = stock;
  }
}
