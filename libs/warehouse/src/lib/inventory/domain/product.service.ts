import { buildQuery } from '@dinocommerce/shared';
import { QueryExpression } from '@dinocommerce/warehouse-api';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ProductNotFoundException } from './exception/product-not-found.exception';
import { Product } from './product';

@Injectable()
export class ProductDomainService {
  constructor(@InjectRepository(Product) private productRepository: EntityRepository<Product>) {}

  async findProducts(query: QueryExpression<Product>): Promise<Product[]> {
    return await buildQuery(this.productRepository, query);
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({ id });

    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async findProductsByProductCategoryId(productCategoryId: string): Promise<Product[]> {
    return await this.productRepository.find({ categoryId: productCategoryId });
  }

  async assertProductByParentId(parentId: string): Promise<void> {
    const product = await this.productRepository.findOneOrFail({ parentId: parentId });

    if (!product) {
      throw new ProductNotFoundException(parentId);
    }
  }

  async saveProduct(product: Product): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    await this.productRepository.persistAndFlush(createdProduct);

    return createdProduct;
  }

  async updateProduct(existingProduct: Product, updatedProduct: Partial<Product>) {
    const result = wrap(existingProduct).assign(updatedProduct);
    await this.productRepository.persistAndFlush(result);

    return result;
  }
}
