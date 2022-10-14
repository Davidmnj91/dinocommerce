import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductNotFoundException } from './exception/product-not-found.exception';
import { Product } from './product';

@Injectable()
export class ProductDomainService {
  constructor(@InjectRepository(Product) private productRepository: EntityRepository<Product>) {}

  async findProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findProductById(id: string): Promise<Product> {
    return await this.productRepository.findOneOrFail({ id }, { failHandler: () => new ProductNotFoundException(id) });
  }

  async assertProductByParentId(parentId: string): Promise<void> {
    await this.productRepository.findOneOrFail(
      { parentId: parentId },
      { failHandler: () => new ProductNotFoundException(parentId) }
    );
  }

  async saveProduct(product: Product): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    await this.productRepository.persistAndFlush(createdProduct);

    return createdProduct;
  }

  async updateProduct(existingProduct: Product, updatedProduct: Product) {
    const result = wrap(existingProduct).assign(updatedProduct);
    await this.productRepository.persistAndFlush(result);

    return result;
  }
}
