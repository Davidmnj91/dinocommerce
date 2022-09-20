import { wrap } from '@mikro-orm/core';
import { MongoEntityRepository, ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductCategoryNotFoundException } from './exception/product-category-not-found.exception';
import { ProductCategory } from './product-category';

@Injectable()
export class ProductCategoryDomainService {
  constructor(
    @InjectRepository(ProductCategory) private productCategoryRepository: MongoEntityRepository<ProductCategory>
  ) {}

  async findProductCategoryById(id: string): Promise<ProductCategory> {
    return await this.productCategoryRepository.findOneOrFail(
      { id },
      { failHandler: () => new ProductCategoryNotFoundException(id) }
    );
  }

  async assertProductCategoryByParentId(parentId: string): Promise<void> {
    await this.productCategoryRepository.findOneOrFail(
      { parentId: new ObjectId(parentId) },
      { failHandler: () => new ProductCategoryNotFoundException(parentId) }
    );
  }

  async saveProductCategory(productCategory: ProductCategory): Promise<ProductCategory> {
    const createdCategory = this.productCategoryRepository.create(productCategory);
    await this.productCategoryRepository.persistAndFlush(createdCategory);

    return createdCategory;
  }

  async updateProductCategory(existingProductCategory: ProductCategory, updatedProductCategory: ProductCategory) {
    const result = wrap(existingProductCategory).assign(updatedProductCategory);
    await this.productCategoryRepository.persistAndFlush(result);

    return result;
  }
}
