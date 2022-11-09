import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ProductStock } from './product-stock';

@Injectable()
export class ProductStockDomainService {
  constructor(@InjectRepository(ProductStock) private productStockRepository: EntityRepository<ProductStock>) {}

  async findStocksForProducts(productIds: string[]): Promise<ProductStock[]> {
    return await this.productStockRepository.find({ productId: { $in: productIds } });
  }

  async findStockByProductId(id: string): Promise<ProductStock> {
    return await this.productStockRepository.findOne({ productId: id });
  }

  async saveStock(productStock: ProductStock): Promise<ProductStock> {
    const createdProductStock = this.productStockRepository.create(productStock);
    await this.productStockRepository.persistAndFlush(createdProductStock);

    return createdProductStock;
  }

  async updateStock(existingStock: ProductStock, updatedStock: Partial<ProductStock>) {
    const result = wrap(existingStock).assign(updatedStock);
    await this.productStockRepository.persistAndFlush(result);

    return result;
  }
}
